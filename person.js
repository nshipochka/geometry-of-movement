BODYPART_DIAMETER = 0.5;
WAIST_WIDTH = 1;

TORSO_HEIGHT = 2.5;
HEAD_POSITION = TORSO_HEIGHT/2 + BODYPART_DIAMETER

SHOULDER_WIDTH = 1.5;
ARM_LENGTH = 1;

LEG_LENGTH = 1.75;

ARM_ROT_V = 50;
ARM_ROT_H = 20;

FOREARM_ROT_V = 20;
FOREARM_ROT_H = 30;
FOREARM_ROT_T = 20;

LEG_ROT_H = -75;
LEG_ROT_T = -LEG_ROT_H*1.25;

class Person{
    //По подадена начална точка създава човек, като тази точка се намира в центъра на кръста
    constructor(pos){
        // Измества точката нагоре, така че ако човекът се опира с външен обект
        // в тази точка, да седне върху него, а не да се застъпват
        pos[2] += BODYPART_DIAMETER/2;

        // Кръста
        this.waist = generateDisk(pos, BODYPART_DIAMETER, WAIST_WIDTH, null);
        this.waist.rotV = 90; //horizontal
        
        // Горна част на тялото
        this.torso = generateDisk([TORSO_HEIGHT/2 + BODYPART_DIAMETER/2, 0, 0], WAIST_WIDTH, TORSO_HEIGHT, this.waist);
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
        //this.rightCalfJoint.rotT = -LEG_ROT_T;

        this.testerHorizontal = generateDisk([0,0,0], 0.2, 2, this.rightCalfJoint, Mecho.METAL);
        this.testerHorizontal.rotV = 90;

        this.testerVertical = generateDisk([0,0,0], 0.2, 2, this.rightCalfJoint, Mecho.INDUSTRIAL);
        this.testerVertical.rotT = 90;
    
        this.rightCalf = generateDisk([0, 0, LEG_LENGTH/2], BODYPART_DIAMETER, LEG_LENGTH, this.rightCalfJoint);
    }

    // Анимира движението на краката
    animateLegs(t, speed){
        var move = LEG_ROT_H * sin(t*3/4);
		if(move < 0.5){
			move = - LEG_ROT_H * sin(t*3/4);
		}
			
		this.leftLegJoint.rotH = (-move);
		this.leftCalfJoint.rotT = -this.leftLegJoint.rotH;// - 1/5*move;

		this.rightLegJoint.rotH = (LEG_ROT_H + move);
		this.rightCalfJoint.rotT = -LEG_ROT_H + this.leftLegJoint.rotH;// - 1/5*move;
        //this.rightCalfJoint.center.x = sin(t);
        //this.rightCalfJoint.center.y = cos(t);
    }
}