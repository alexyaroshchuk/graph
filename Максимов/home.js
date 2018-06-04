function home() {

    // this.homeWallVertex = [
    //     new Complex(100, 100),
    //     new Complex(100, 150),
    //     new Complex(150, 150),
    //     new Complex(150, 100)
    // ];

    // this.homeRoofVertex = [
    //     new Complex(100, 100),
    //     new Complex(120, 65),
    //     new Complex(140, 100)
    // ];

    // this.homeWinVertex = [
    //     new Complex(110, 110),
    //     new Complex(110, 140),
    //     new Complex(140, 140),
    //     new Complex(140, 110)
    // ];

    // this.homeChimneyVertex = [
    //     new Complex(140, 80),
    //     new Complex(140, 100),
    //     new Complex(150, 100),
    //     new Complex(150, 80)
    // ];

    this.homeWallVertex = [
        new Complex(10, 10),
        new Complex(10, 15),
        new Complex(15, 15),
        new Complex(15, 10)
    ];

    this.homeRoofVertex = [
        new Complex(10, 10),
        new Complex(12, 6.5),
        new Complex(14, 10)
    ];

    this.homeWinVertex = [
        new Complex(11, 11),
        new Complex(11, 14),
        new Complex(14, 14),
        new Complex(14, 11)
    ];

    this.homeChimneyVertex = [
        new Complex(14, 8),
        new Complex(14, 10),
        new Complex(15, 10),
        new Complex(15, 8)
    ];

    this.draw = function(drawLine) {
        var homeWallVertex = this.homeWallVertex;
        var homeRoofVertex = this.homeRoofVertex;
        var homeWinVertex = this.homeWinVertex;
        var homeChimneyVertex = this.homeChimneyVertex;

        for (var i = 0; i < homeWallVertex.length - 1; i++) {
            drawLine(homeWallVertex[i].x, homeWallVertex[i].y, homeWallVertex[i + 1].x, homeWallVertex[i + 1].y);
        }

        drawLine(homeWallVertex[homeWallVertex.length - 1].x, homeWallVertex[homeWallVertex.length - 1].y, homeWallVertex[0].x, homeWallVertex[0].y);

        for (var i = 0; i < homeRoofVertex.length - 1; i++) {
            drawLine(homeRoofVertex[i].x, homeRoofVertex[i].y, homeRoofVertex[i + 1].x, homeRoofVertex[i + 1].y);
        }

        for (var i = 0; i < homeWinVertex.length - 1; i++) {
            drawLine(homeWinVertex[i].x, homeWinVertex[i].y, homeWinVertex[i + 1].x, homeWinVertex[i + 1].y);
        }

        drawLine(homeWinVertex[homeWinVertex.length - 1].x, homeWinVertex[homeWinVertex.length - 1].y, homeWinVertex[0].x, homeWinVertex[0].y);

        for (var i = 0; i < homeChimneyVertex.length - 1; i++) {
            drawLine(homeChimneyVertex[i].x, homeChimneyVertex[i].y, homeChimneyVertex[i + 1].x, homeChimneyVertex[i + 1].y);
        }

        drawLine(homeChimneyVertex[homeChimneyVertex.length - 1].x, homeChimneyVertex[homeChimneyVertex.length - 1].y, homeChimneyVertex[0].x, homeChimneyVertex[0].y);
    };

    this.square = function() {
        var homeWallV = this.homeWallVertex;
        var homeRoofV = this.homeRoofVertex;
        var homeWinV = this.homeWinVertex;
        var homeChimneyV = this.homeChimneyVertex;

        var centeres = this.getPartCenteres();

        function trns(arrVertex, point) {
            for (var i = 0; i < arrVertex.length; i++) {
                arrVertex[i] = arrVertex[i].sum(point);
            }
        }


        trns(homeChimneyV, new Complex(-centeres.chimney.x, -centeres.chimney.y));
        trns(homeRoofV, new Complex(-centeres.roof.x, -centeres.roof.y));
        trns(homeWinV, new Complex(-centeres.win.x, -centeres.win.y));
        trns(homeWallV, new Complex(-centeres.wall.x, -centeres.wall.y));

        // var center = this.calcCenter();
        // this.translate(new Complex(-center.x, -center.y));

        for (var i = 0; i < homeWallV.length; i++) {
            homeWallV[i] = homeWallV[i].mul(homeWallV[i]);
        }

        for (var i = 0; i < homeRoofV.length; i++) {
            homeRoofV[i] = homeRoofV[i].mul(homeRoofV[i]);
        }

        for (var i = 0; i < homeWinV.length; i++) {
            homeWinV[i] = homeWinV[i].mul(homeWinV[i]);
        }

        for (var i = 0; i < homeChimneyV.length; i++) {
            homeChimneyV[i] = homeChimneyV[i].mul(homeChimneyV[i]);
        }

        trns(homeChimneyV, new Complex(centeres.chimney.x, centeres.chimney.y));
        trns(homeRoofV, new Complex(centeres.roof.x, centeres.roof.y));
        trns(homeWinV, new Complex(centeres.win.x, centeres.win.y));
        trns(homeWallV, new Complex(centeres.wall.x, centeres.wall.y));
        // this.translate(new Complex(center.x, center.y));
    }

    this.getPartCenteres = function() {
        var homeWallV = this.homeWallVertex;
        var homeRoofV = this.homeRoofVertex;
        var homeWinV = this.homeWinVertex;
        var homeChimneyV = this.homeChimneyVertex;

        var wall;
        var roof;
        var win;
        var chimney;

        var sumX = 0;
        var sumY = 0;
        var length = homeWallV.length;
        for (var i = 0; i < length; i++) {
            sumX += homeWallV[i].x;
            sumY += homeWallV[i].y;
        }
        wall = new Complex(sumX / length, sumY / length);

        sumX = 0;
        sumY = 0;
        length = homeChimneyV.length;
        for (var i = 0; i < length; i++) {
            sumX += homeChimneyV[i].x;
            sumY += homeChimneyV[i].y;
        }
        chimney = new Complex(sumX / length, sumY / length);

        sumX = 0;
        sumY = 0;
        var length = homeRoofV.length;
        for (var i = 0; i < length; i++) {
            sumX += homeRoofV[i].x;
            sumY += homeRoofV[i].y;
        }
        roof = new Complex(sumX / length, sumY / length);

        sumX = 0;
        sumY = 0;
        var length = homeWinV.length;
        for (var i = 0; i < length; i++) {
            sumX += homeWinV[i].x;
            sumY += homeWinV[i].y;
        }
        win = new Complex(sumX / length, sumY / length);

        var obj = {
            win: win,
            roof: roof,
            wall: wall,
            chimney: chimney
        };
        return obj;
    }

    this.calcCenter = function() {
        var homeWallVertex = this.homeWallVertex;
        var homeChimneyVertex = this.homeChimneyVertex;

        var sumX = 0;
        var sumY = 0;
        for (var i = 0; i < homeWallVertex.length; i++) {
            sumX += homeWallVertex[i].x;
            sumY += homeWallVertex[i].y;
        }
        // for (var i = 0; i < homeChimneyVertex.length; i++) {
        // 	sumX+=homeChimneyVertex[i].x;
        // 	sumY+=homeChimneyVertex[i].y;
        // }

        // for (var i = 0; i < this.homeRoofVertex.length; i++) {
        // 	sumX+=homeChimneyVertex[i].x;
        // 	sumY+=homeChimneyVertex[i].y;
        // }

        sumX += this.homeRoofVertex[1].x;
        sumY += this.homeRoofVertex[1].y;

        sumX += this.homeChimneyVertex[3].x;
        sumY += this.homeChimneyVertex[3].y;

        sumX /= homeWallVertex.length + 1 + 1;
        sumY /= homeWallVertex.length + 1 + 1;
        alert(JSON.stringify({
            "x": sumX,
            "y": sumY
        }));

        return new Complex(sumX, sumY);
    }

    this.translate = function(coef) {
        var homeWallV = this.homeWallVertex;
        var homeRoofV = this.homeRoofVertex;
        var homeWinV = this.homeWinVertex;
        var homeChimneyV = this.homeChimneyVertex;

        for (var i = 0; i < homeWallV.length; i++) {
            homeWallV[i] = homeWallV[i].sum(coef);
        }

        for (var i = 0; i < homeRoofV.length; i++) {
            homeRoofV[i] = homeRoofV[i].sum(coef);
        }

        for (var i = 0; i < homeWinV.length; i++) {
            homeWinV[i] = homeWinV[i].sum(coef);
        }

        for (var i = 0; i < homeChimneyV.length; i++) {
            homeChimneyV[i] = homeChimneyV[i].sum(coef);
        }
    }
}