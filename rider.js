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
        this.riderPoint = this.unicycle.seat.center;
        this.riderPoint[2] += BODYPART_DIAMETER/2;

        // Кръста
        this.waist = generateDisk([0,0,BODYPART_DIAMETER/2], BODYPART_DIAMETER, WAIST_WIDTH, this.unicycle.seat);
        this.waist.rotV = 90; 
        this.waist.rotS = 5;

        this.waistJoint = ball([BODYPART_DIAMETER,0,0], BODYPART_DIAMETER * 2);
        this.waistJoint.parent = this.waist;
        this.waistJoint.material = Mecho.BLUE;
        
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
        this.leftArmJoint.material = Mecho.BLUE;
        this.leftArmJoint.rotV = -ARM_ROT_V;
        this.leftArmJoint.rotH = -ARM_ROT_H;

        this.leftArm = generateDisk([-ARM_LENGTH/2,0,0], BODYPART_DIAMETER, ARM_LENGTH, this.leftArmJoint);
        this.leftArm.rotV = 90;
        
        // Лява предмишница
        this.leftForearmJoint = ball([0, 0, ARM_LENGTH/2], BODYPART_DIAMETER);
        this.leftForearmJoint.parent = this.leftArm;
        this.leftForearmJoint.material = Mecho.BLUE;
        this.leftForearmJoint.rotV = -FOREARM_ROT_V;
        this.leftForearmJoint.rotH = FOREARM_ROT_H;
        this.leftForearmJoint.rotT = -FOREARM_ROT_T;

        this.leftForearm = generateDisk([0,0,ARM_LENGTH/2], BODYPART_DIAMETER, ARM_LENGTH, this.leftForearmJoint);

        // Дясна
        this.rightArmJoint = ball([0, 0, -SHOULDER_WIDTH/2], BODYPART_DIAMETER);
        this.rightArmJoint.parent = this.shoulders;
        this.rightArmJoint.material = Mecho.BLUE;
        this.rightArmJoint.rotV = ARM_ROT_V;
        this.rightArmJoint.rotH = -ARM_ROT_H;

        this.rightArm = generateDisk([-ARM_LENGTH/2,0,0], BODYPART_DIAMETER, ARM_LENGTH, this.rightArmJoint);
        this.rightArm.rotV = -90;

        // Дясна предмишница
        this.rightForearmJoint = ball([0, 0, -ARM_LENGTH/2], BODYPART_DIAMETER);
        this.rightForearmJoint.parent = this.rightArm;
        this.rightForearmJoint.material = Mecho.BLUE;
        this.rightForearmJoint.rotV = FOREARM_ROT_V;
        this.rightForearmJoint.rotH = FOREARM_ROT_H;
        this.rightForearmJoint.rotT = FOREARM_ROT_T;

        this.rightForearm = generateDisk([0,0,-ARM_LENGTH/2], BODYPART_DIAMETER, ARM_LENGTH, this.rightForearmJoint);

        // Крака
        // Ляв
        this.leftLegJoint = ball([0, 0, WAIST_WIDTH/2], BODYPART_DIAMETER);
        this.leftLegJoint.parent = this.waist;
        this.leftLegJoint.material = Mecho.BLUE;

        this.leftLeg = generateDisk([-LEG_LENGTH/2, 0, 0], BODYPART_DIAMETER, LEG_LENGTH, this.leftLegJoint);
        this.leftLeg.rotV = 90;
        
        // Ляв прасец
        this.leftCalfJoint = ball([0, 0, LEG_LENGTH/2], BODYPART_DIAMETER);
        this.leftCalfJoint.parent = this.leftLeg;
        this.leftCalfJoint.material = Mecho.BLUE;
        //this.leftCalfJoint.rotT = -LEG_ROT_H*1.25;

        this.leftCalf = generateDisk([0,0,LEG_LENGTH/2], BODYPART_DIAMETER, LEG_LENGTH, this.leftCalfJoint);

        // Ляво стъпало
        this.leftFootJoint = ball([0, 0, LEG_LENGTH/2], BODYPART_DIAMETER);
        this.leftFootJoint.parent = this.leftCalf;
        this.leftFootJoint.material = Mecho.BLUE;

        this.leftFoot = box([0, 0, BODYPART_DIAMETER/2], BODYPART_DIAMETER, FOOT_LENGTH, 0.2);
        this.leftFoot.parent = this.leftFootJoint;
        this.leftFoot.material = Mecho.GREEN;
        this.leftFoot.centerOffset = [0, FOOT_LENGTH/4 ,0];

        // Десен
        this.rightLegJoint = ball([0, 0, -WAIST_WIDTH/2], BODYPART_DIAMETER);
        this.rightLegJoint.parent = this.waist;
        this.rightLegJoint.material = Mecho.BLUE;
        this.rightLegJoint.rotH = LEG_ROT_H;

        this.rightLeg = generateDisk([-LEG_LENGTH/2, 0, 0], BODYPART_DIAMETER, LEG_LENGTH, this.rightLegJoint);
        this.rightLeg.rotV = 90;

        // Десен прасец
        this.rightCalfJoint = ball([0, 0, LEG_LENGTH/2], BODYPART_DIAMETER);
        this.rightCalfJoint.parent = this.rightLeg;
        this.rightCalfJoint.material = Mecho.BLUE;
        this.rightCalfJoint.rotT = LEG_ROT_T;

        this.testerHorizontal = generateDisk([0,0,0], 0.2, 2, this.rightCalfJoint, Mecho.METAL);
        this.testerHorizontal.rotV = 90;

        this.testerVertical = generateDisk([0,0,0], 0.2, 2, this.rightCalfJoint, Mecho.INDUSTRIAL);
        this.testerVertical.rotT = 90;
    
        this.rightCalf = generateDisk([0, 0, LEG_LENGTH/2], BODYPART_DIAMETER, LEG_LENGTH, this.rightCalfJoint);

        // Дясно стъпало
        this.rightFootJoint = ball([0, 0, LEG_LENGTH/2], BODYPART_DIAMETER);
        this.rightFootJoint.parent = this.rightCalf;
        this.rightFootJoint.material = Mecho.BLUE;
        this.rightFootJoint.rotT = FOOT_ROT_T;

        this.rightFoot = box([0, 0, BODYPART_DIAMETER/2], BODYPART_DIAMETER, FOOT_LENGTH, 0.2);
        this.rightFoot.parent = this.rightFootJoint;
        this.rightFoot.material = Mecho.GREEN;
        this.rightFoot.centerOffset = [0, FOOT_LENGTH/4 ,0];

        // this.leftLegJoint.rotH = - 50 + 20 * cos((this.unicycle.seat.rotT + this.unicycle.wheelTube.rotH + this.unicycle.leftCrank.rotH));
		// this.leftCalfJoint.rotT = 80 - 35 * cos((this.unicycle.seat.rotT + this.unicycle.wheelTube.rotH + this.unicycle.leftCrank.rotH + 30));
        // this.leftFootJoint.rotT = -10 + 10 * cos((this.unicycle.seat.rotT + this.unicycle.wheelTube.rotH + this.unicycle.leftCrank.rotH - 30));

		// this.rightLegJoint.rotH = - 50 - 20 * cos((this.unicycle.seat.rotT + this.unicycle.wheelTube.rotH + this.unicycle.rightCrank.rotH));
		// this.rightCalfJoint.rotT = + 80 + 35 * cos((this.unicycle.seat.rotT + this.unicycle.wheelTube.rotH + this.unicycle.rightCrank.rotH + 30));
        // this.rightFootJoint.rotT = - 10 - 10 * cos((this.unicycle.seat.rotT + this.unicycle.wheelTube.rotH + this.unicycle.rightCrank.rotH - 30));
    
        // console.log("Cos: " + this.unicycle.wheelTube.rotH);
    }

    // Анимира движението на краката
    animateLegs(t){

        this.unicycle.wheelTube.rotH = this.speed * t;
        this.unicycle.leftPedal.rotS = 20 - this.speed * t;
        this.unicycle.rightPedal.rotS = - 20 + this.speed * t;

        this.crankRot = this.unicycle.seat.rotT + this.unicycle.wheelTube.rotH + this.unicycle.leftCrank.rotH;
		this.leftLegJoint.rotH = -50 + 20 * cos(this.crankRot * Math.PI / 180) //* Math.PI / 180;
		this.leftCalfJoint.rotT = 80 - 35 * cos((this.crankRot + 30) * Math.PI / 180) //* Math.PI / 180;
        this.leftFootJoint.rotT = -10 + 10 * cos((this.crankRot - 30) * Math.PI / 180) //* Math.PI / 180;

		this.rightLegJoint.rotH = -50 - 20 * cos(this.crankRot * Math.PI / 180) //* Math.PI / 180;
		this.rightCalfJoint.rotT = 80 + 35 * cos((this.crankRot + 30) * Math.PI / 180) //* Math.PI / 180;
        this.rightFootJoint.rotT = -10 - 10 * cos((this.crankRot - 30) * Math.PI / 180) //* Math.PI / 180;
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