WHEEL_DIAMETER = 2.8;
WHEEL_WIDTH = 0.25;
WHEELTUBE_LENGTH = 0.8;

TUBE_WIDTH = 0.15;
SMALL_TUBE_WIDTH = 0.1;

SPOKE_WIDTH = 0.05;
SPOKE_LENGTH = WHEEL_DIAMETER - 0.2;

SEAT_HEIGHT = 0.2;
SEATPOST_HEIGHT = 1;

FORK_WIDTH = WHEEL_WIDTH * 2;
FORK_HEIGHT = 1.5;


class Unicycle{

    // Създава моноцикъл по дадена точка - къде да стъпва гумата
    constructor(pos){
        
        // Измества точката, така че начална точка да е на нивото на седалката
        this.pos = pos;
        this.pos[2] += WHEEL_DIAMETER/2 + FORK_HEIGHT + SEATPOST_HEIGHT + SEAT_HEIGHT/2;
        
        // Седалка
        this.seat = generateDisk(pos, 0.5, SEAT_HEIGHT, null, Mecho.BLACK);
        this.seat2 = generateDisk([0, -0.3, 0], 0.3, SEAT_HEIGHT, this.seat, Mecho.BLACK);
        this.seat3 = generateDisk([0, -0.2, 0], 0.3, SEAT_HEIGHT, this.seat2, Mecho.BLACK);

        this.seat.rotT = 10;

        this.seatPost = generateDisk([0, -SEAT_HEIGHT/2, -(SEATPOST_HEIGHT/2 + SEAT_HEIGHT/2)], TUBE_WIDTH, SEATPOST_HEIGHT, this.seat, Mecho.RED);

        // Вилка
        this.forkTube = generateDisk([0,0,-SEATPOST_HEIGHT/2], TUBE_WIDTH, FORK_WIDTH, this.seatPost, Mecho.RED);
        this.forkTube.rotV = 90; 	
        
        this.leftFork = generateDisk([-FORK_HEIGHT/2 ,0, FORK_WIDTH/2], TUBE_WIDTH, FORK_HEIGHT, this.forkTube, Mecho.RED);
        this.leftFork.rotV = 90;

        this.rightFork = generateDisk([-FORK_HEIGHT/2 ,0, -FORK_WIDTH/2], TUBE_WIDTH, FORK_HEIGHT, this.forkTube, Mecho.RED);
        this.rightFork.rotV = 90;

        // Колело
        this.wheelTube = generateDisk([-FORK_HEIGHT,0,0], SMALL_TUBE_WIDTH, WHEELTUBE_LENGTH, this.forkTube, Mecho.BLACK);

        this.wheelBarrel = generateDisk([0,0,0], 0.3, 0.1, this.wheelTube, Mecho.METAL);

        this.spoke1 = generateDisk([0,0,0], SPOKE_WIDTH, SPOKE_LENGTH, this.wheelBarrel, Mecho.METAL);
        this.spoke1.rotV = 90;

        this.spoke2 = generateDisk([0,0,0], SPOKE_WIDTH, SPOKE_LENGTH, this.wheelBarrel, Mecho.METAL);
        this.spoke2.rotV = 90;
        this.spoke2.rotH = 90;

        this.spoke3 = generateDisk([0,0,0], SPOKE_WIDTH, SPOKE_LENGTH, this.wheelBarrel, Mecho.METAL);
        this.spoke3.rotV = 90;
        this.spoke3.rotH = 45;

        this.spoke4 = generateDisk([0,0,0], SPOKE_WIDTH, SPOKE_LENGTH, this.wheelBarrel, Mecho.METAL);
        this.spoke4.rotV = 90;
        this.spoke4.rotH = -45;

        this.wheel = tube([0,0,0], WHEEL_WIDTH, WHEEL_DIAMETER, WHEEL_WIDTH/5, WHEEL_DIAMETER - 0.5);
        this.wheel.parent = this.wheelBarrel;
        this.wheel.material = Mecho.BLACK;
        
        // Педали
        // Ляв
        this.leftCrank = generateDisk([0,0, WHEELTUBE_LENGTH/2], SMALL_TUBE_WIDTH, FORK_HEIGHT/2, this.wheelTube, Mecho.METAL);
        this.leftCrank.centerOffset = [0,0, -WHEELTUBE_LENGTH/2];
        this.leftCrank.rotV = 90;
        this.leftCrank.rotH = 45;

        this.leftPedal = box([0,0,WHEELTUBE_LENGTH/2], 0.1, 0.3, 0.5);
        this.leftPedal.parent = this.leftCrank;
        this.leftPedal.material = Mecho.BLACK;
        this.leftPedal.rotV = -90;
        this.leftPedal.rotS = -35;
        
        // Десен
        this.rightCrank = generateDisk([0,0,-WHEELTUBE_LENGTH/2], SMALL_TUBE_WIDTH, FORK_HEIGHT/2, this.wheelTube, Mecho.METAL);
        this.rightCrank.centerOffset = [0,0,WHEELTUBE_LENGTH/2];
        this.rightCrank.rotV = 90;
        this.rightCrank.rotH = 45;

        this.rightPedal = box([0,0,-WHEELTUBE_LENGTH/2], 0.1, 0.3, 0.5);
        this.rightPedal.parent = this.rightCrank;
        this.rightPedal.material = Mecho.BLACK;
        this.rightPedal.rotV = 90;
        this.rightPedal.rotS = 35;
    }

    // Връща точка на върха на седалката, където трябва да седне колкоездачът
    getRiderPoint(){
        var personPos = [this.pos[0], this.pos[1], this.pos[2]];
        personPos[2] += SEAT_HEIGHT/2;

        return personPos;
    }

    getLeftPedal(){
        var leftPedalPos = this.leftPedal.center;
        console.log(leftPedalPos);

        return leftPedalPos;
    }

    getRightPedal(){
        var rightPedalPos = this.rightPedal.center;
        console.log(rightPedalPos);

        return rightPedalPos;
    }

    // Анимира въртенето на моноцикъла
    animateMovement(t, speed){
        this.wheelTube.rotH = speed * t;
        this.leftPedal.rotS = -35 - speed * t;
        this.rightPedal.rotS = 35 + speed * t;
    }
}