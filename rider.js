ROTATION_SPEED = 80;

BODYPART_DIAMETER = 0.5;
WAIST_WIDTH = 1.5;

TORSO_HEIGHT = 2.5;
HEAD_POSITION = TORSO_HEIGHT/2 + BODYPART_DIAMETER

SHOULDER_WIDTH = 1.5;
ARM_LENGTH = 1;

LEG_LENGTH = 1.75;

FOOT_LENGTH = BODYPART_DIAMETER * 2;

ARM_ROT_V = 50;
ARM_ROT_H = 20;

FOREARM_ROT_V = 20;
FOREARM_ROT_H = 30;
FOREARM_ROT_T = 20;

LEG_ROT_H = -73;
LEG_ROT_T = -LEG_ROT_H*1.25;

FOOT_ROT_T = -20;

class Rider{
    // По подадена начална точка създава колоездач с моноцикъл, като тази точка се намира на най-долната точка
    // на гумата на моноцикъла
    constructor(pos){
        this.speed = ROTATION_SPEED;

        this.unicycle = new Unicycle(pos);

        // Измества точката за колоездач нагоре, така че да седне върху седалката на моноцикъла,
        // а не да се застъпват
        this.riderPoint = [pos[0], pos[1], pos[2]];
        this.riderPoint[2] += BODYPART_DIAMETER/2 + SEAT_HEIGHT/2;

        // Кръста
        this.waist = generateDisk(this.riderPoint, BODYPART_DIAMETER, WAIST_WIDTH, this.unicycle.seat);
        this.waist.rotV = 90; 
        this.waist.rotS = 5;

        this.waistJoint = ball([BODYPART_DIAMETER,0,0], BODYPART_DIAMETER * 2);
        this.waistJoint.parent = this.waist;
        this.waistJoint.material = Mecho.GREEN;
        
        // Горна част на тялото
        this.torso = generateDisk([TORSO_HEIGHT/2, 0, 0], BODYPART_DIAMETER*2, TORSO_HEIGHT, this.waistJoint);
        this.torso.rotV = -90;

        this.head = ball([0, 0, HEAD_POSITION], BODYPART_DIAMETER * 2);
        this.head.material = Mecho.GREEN;
        this.head.parent = this.torso;

        this.shoulders = generateDisk([0, 0, TORSO_HEIGHT/2 - BODYPART_DIAMETER/2], BODYPART_DIAMETER, SHOULDER_WIDTH, this.torso);
        this.shoulders.rotV = 90;

        // Ръце
        // Лява 
        this.leftArmJoint = ball([0, 0, SHOULDER_WIDTH/2], BODYPART_DIAMETER);
        this.leftArmJoint.parent = this.shoulders;
        this.leftArmJoint.material = Mecho.GREEN;
        this.leftArmJoint.rotV = -ARM_ROT_V;
        this.leftArmJoint.rotH = -ARM_ROT_H;

        this.leftArm = generateDisk([-ARM_LENGTH/2,0,0], BODYPART_DIAMETER, ARM_LENGTH, this.leftArmJoint);
        this.leftArm.rotV = 90;
        
        // Лява предмишница
        this.leftForearmJoint = ball([0, 0, ARM_LENGTH/2], BODYPART_DIAMETER);
        this.leftForearmJoint.parent = this.leftArm;
        this.leftForearmJoint.material = Mecho.GREEN;
        this.leftForearmJoint.rotV = -FOREARM_ROT_V;
        this.leftForearmJoint.rotH = FOREARM_ROT_H;
        this.leftForearmJoint.rotT = -FOREARM_ROT_T;

        this.leftForearm = generateDisk([0,0,ARM_LENGTH/2], BODYPART_DIAMETER, ARM_LENGTH, this.leftForearmJoint);

        // Дясна
        this.rightArmJoint = ball([0, 0, -SHOULDER_WIDTH/2], BODYPART_DIAMETER);
        this.rightArmJoint.parent = this.shoulders;
        this.rightArmJoint.material = Mecho.GREEN;
        this.rightArmJoint.rotV = ARM_ROT_V;
        this.rightArmJoint.rotH = -ARM_ROT_H;

        this.rightArm = generateDisk([-ARM_LENGTH/2,0,0], BODYPART_DIAMETER, ARM_LENGTH, this.rightArmJoint);
        this.rightArm.rotV = -90;

        // Дясна предмишница
        this.rightForearmJoint = ball([0, 0, -ARM_LENGTH/2], BODYPART_DIAMETER);
        this.rightForearmJoint.parent = this.rightArm;
        this.rightForearmJoint.material = Mecho.GREEN;
        this.rightForearmJoint.rotV = FOREARM_ROT_V;
        this.rightForearmJoint.rotH = FOREARM_ROT_H;
        this.rightForearmJoint.rotT = FOREARM_ROT_T;

        this.rightForearm = generateDisk([0,0,-ARM_LENGTH/2], BODYPART_DIAMETER, ARM_LENGTH, this.rightForearmJoint);

        // Крака
        // Ляв
        this.leftLegJoint = ball([0, 0, WAIST_WIDTH/2], BODYPART_DIAMETER);
        this.leftLegJoint.parent = this.waist;
        this.leftLegJoint.material = Mecho.GREEN;

        this.leftLeg = generateDisk([-LEG_LENGTH/2, 0, 0], BODYPART_DIAMETER, LEG_LENGTH, this.leftLegJoint);
        this.leftLeg.rotV = 90;
        
        // Ляв прасец
        this.leftCalfJoint = ball([0, 0, LEG_LENGTH/2], BODYPART_DIAMETER);
        this.leftCalfJoint.parent = this.leftLeg;
        this.leftCalfJoint.material = Mecho.GREEN;

        this.leftCalf = generateDisk([0,0,LEG_LENGTH/2], BODYPART_DIAMETER, LEG_LENGTH, this.leftCalfJoint);

        // Ляво стъпало
        this.leftFootJoint = ball([0, 0, LEG_LENGTH/2], BODYPART_DIAMETER);
        this.leftFootJoint.parent = this.leftCalf;
        this.leftFootJoint.material = Mecho.GREEN;

        this.leftFoot = box([0, 0, BODYPART_DIAMETER/2], BODYPART_DIAMETER, FOOT_LENGTH, 0.2);
        this.leftFoot.parent = this.leftFootJoint;
        this.leftFoot.material = Mecho.GREEN;
        this.leftFoot.imageOffset = [0, -FOOT_LENGTH/4 ,0];

        //Свиване на левия крак, така че да е върху педала
        this.leftLegJoint.rotH = -50 + 20 * cos(this.unicycle.leftCrankRot * Math.PI / 180); 
		this.leftCalfJoint.rotT = 80 - 35 * cos((this.unicycle.leftCrankRot + 30) * Math.PI / 180);
        this.leftFootJoint.rotT = -10 + 10 * cos((this.unicycle.leftCrankRot - 30) * Math.PI / 180);

        // Десен
        this.rightLegJoint = ball([0, 0, -WAIST_WIDTH/2], BODYPART_DIAMETER);
        this.rightLegJoint.parent = this.waist;
        this.rightLegJoint.material = Mecho.GREEN;

        this.rightLeg = generateDisk([-LEG_LENGTH/2, 0, 0], BODYPART_DIAMETER, LEG_LENGTH, this.rightLegJoint);
        this.rightLeg.rotV = 90;

        // Десен прасец
        this.rightCalfJoint = ball([0, 0, LEG_LENGTH/2], BODYPART_DIAMETER);
        this.rightCalfJoint.parent = this.rightLeg;
        this.rightCalfJoint.material = Mecho.GREEN;
    
        this.rightCalf = generateDisk([0, 0, LEG_LENGTH/2], BODYPART_DIAMETER, LEG_LENGTH, this.rightCalfJoint);

        // Дясно стъпало
        this.rightFootJoint = ball([0, 0, LEG_LENGTH/2], BODYPART_DIAMETER);
        this.rightFootJoint.parent = this.rightCalf;
        this.rightFootJoint.material = Mecho.GREEN;

        this.rightFoot = box([0, 0, BODYPART_DIAMETER/2], BODYPART_DIAMETER, FOOT_LENGTH, 0.2);
        this.rightFoot.parent = this.rightFootJoint;
        this.rightFoot.material = Mecho.GREEN;
        this.rightFoot.imageOffset = [0, -FOOT_LENGTH/4 ,0];

        //Свиване на десния крак, така че да е върху педала
        this.rightLegJoint.rotH = -65 - 20 * cos((this.unicycle.rightCrankRot) * Math.PI / 180);
		this.rightCalfJoint.rotT = 90 + 35 * cos((this.unicycle.rightCrankRot - 10) * Math.PI / 180);
        this.rightFootJoint.rotT = -10 - 10 * cos((this.unicycle.rightCrankRot - 15) * Math.PI / 180);
    }

    // Анимира движението на краката
    animateLegs(t){   
        this.unicycle.wheelTube.rotH = this.speed * t;

        this.leftLegJoint.rotH = -50 + 20 * cos(this.unicycle.leftCrankRot * Math.PI / 180);
		this.leftCalfJoint.rotT = 80 - 35 * cos((this.unicycle.leftCrankRot + 30) * Math.PI / 180); 
        this.leftFootJoint.rotT = -10 + 10 * cos((this.unicycle.leftCrankRot - 30) * Math.PI / 180);
		
        this.rightLegJoint.rotH = -50 - 20 * cos(this.unicycle.rightCrankRot * Math.PI / 180); 
		this.rightCalfJoint.rotT = 80 + 35 * cos((this.unicycle.rightCrankRot + 30) * Math.PI / 180); 
        this.rightFootJoint.rotT = -10 - 10 * cos((this.unicycle.rightCrankRot - 30) * Math.PI / 180);
    
        this.unicycle.leftPedal.rotS = 45 - this.unicycle.leftCrankRot;
        this.unicycle.rightPedal.rotS = - 45 + this.unicycle.rightCrankRot;
    }

    animateTorso(t){
        this.waistJoint.rotS = 5 + 5*sin(t);

        this.leftArmJoint.rotH = -ARM_ROT_H + 5 * sin(this.speed * t * Math.PI / 180); 
        this.rightArmJoint.rotH = -ARM_ROT_H + 5 * sin(this.speed * t * Math.PI / 180); 
        this.leftArmJoint.rotS = -ARM_ROT_H + 10 * sin(this.speed * t * Math.PI / 180); 
        this.rightArmJoint.rotS = -ARM_ROT_H + 10 * sin(this.speed * t * Math.PI / 180); 

        this.leftForearmJoint.rotV = -ARM_ROT_H + 10 * sin(this.speed * t * Math.PI / 180);
        this.rightForearmJoint.rotV = ARM_ROT_H + 10 * sin(this.speed * t * Math.PI / 180);
    }
}