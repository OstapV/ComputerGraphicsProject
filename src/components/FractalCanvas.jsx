import React, {useEffect } from 'react'

const FractalCanvas = ({iterations, build, color, roughness, typeOfPlasma, settings, 
                        opacity, brownianColor, brownianFrames, dotsCount}) => 
{
    
    function ConvertHexToRGB(hex) {
      var res = [0,0,0];
      
      const arr = [...hex.matchAll('#([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})')];
      if(arr[0] != null) {
          const match = arr[0];
          if(match.length === 4) {
              res[0] = Number.parseInt(match[1],16);
              res[1] = Number.parseInt(match[2],16);
              res[2] = Number.parseInt(match[3],16);
          }
      }
      return res;
    }

    var points = [];

    function setPoints(canvasId, ctx)
      {
        for(var i = 0; i < dotsCount; i++)
        {
          points[i] = new BrownianMovementFractal();
          points[i].init(canvasId, ctx);
        }
      }

    function BrownianMovementFractal(){
      
      
      var width = 880;
      var height = 500;
      
      var x =  Math.random()*width;// / 2;   width/2;
      var y =  Math.random()*height;// / 2;  height/2;
      var r = 1; // 0.4

      var speedX;
      var speedY;
      var currCanvas;
      var context;

      this.init = function(canvasId, ctx) {
        currCanvas = document.getElementById(canvasId);
        context = ctx;
        currCanvas.width = width;
        currCanvas.height = height;
        context.fillStyle = "black";
        context.fillRect(0, 0, currCanvas.width, currCanvas.height);
      }

      this.drawPoint = function() {
        //  p5.Color.fill(255, 0, 200);
        //  p5.Color.noStroke();
         //p5.Geometry.ellipse(x, y, r, r);
         this.fillEllipse(x, y, r, r, `rgba(${ConvertHexToRGB(brownianColor)}, ${opacity})`);
      }

      this.fillEllipse = function(x, y, radiusX, radiusY, color) {
        context.fillStyle = color;
        context.beginPath();
        context.ellipse(x, y, radiusX, radiusY, 0, 0, 2 * Math.PI);
        context.fill();
      }


      this.movePoints = function () {
        speedX = Math.random()*4-2;
        speedY = Math.random()*4-2;
        x += speedX;
        y += speedY;

        if(x < 0 || x > width)
          x -= speedX*2;

        if(y < 0 || y > height)
          y -= speedY*2;
      }

      this.draw = function () {

      
        for(var i = 0; i < points.length; i++)
        {
          
            points[i].drawPoint();
            points[i].movePoints();
         
        }
      }
    }

    function fractalPlasma() {
      var roughnessC, totalSize,plasmaType;
      var width, height, canvas, ctx, iterationsCount;
      // this.colorModif = [255,255,255];
      var types = { PLASMA: 0, CLOUD: 1 };
      // this.colorModif = [100, 200, 220];
    
      // rough,type, 
      this.init = function(canvasId, w, h, context) 
      {
        //initialize local variables
        width = w;
        height = h;
        roughnessC = roughness;
        plasmaType = parseInt(typeOfPlasma);
        canvas = document.getElementById(canvasId);
        canvas.width = width;
        canvas.height = height;
        ctx = context;
        this.colorModif = this.ConvertHexToRGB(color);
        iterationsCount = iterations;

        //generate points
        this.points = this.getPoints(width, height, roughnessC, iterationsCount);
        
        //draw points
        this.draw();
      }
      
      this.ConvertHexToRGB = function(hex) {
        var res = [0,0,0];
        
        const arr = [...hex.matchAll('#([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})')];
        if(arr[0] != null) {
            const match = arr[0];
            if(match.length === 4) {
                res[0] = Number.parseInt(match[1],16);
                res[1] = Number.parseInt(match[2],16);
                res[2] = Number.parseInt(match[3],16);
            }
        }
        return res;
      }

      this.draw = function()
      {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (var x = 0; x < width; x++)
        {
          for (var y = 0; y < height; y++)
          {
            //get color for each pixel
            var color = this.getColor(this.points[x][y], plasmaType);
            ctx.fillStyle = "rgb("+color.r+","+color.g+","+color.b+")";
            ctx.fillRect(x, y, 1, 1);
          }
        }
      }
      
      this.getPoints = function(width, height, rough, iterations)  
      {  
        var p1, p2, p3, p4;  
        var points = [];
        for (var x = 0; x < width; x++)
        {
          points[x] = [];
        }
        //give corners random colors
        p1 = Math.random();
        p2 = Math.random();
        p3 = Math.random();
        p4 = Math.random();
        roughnessC = roughness;
        totalSize = width + height;
        this.splitRect(points, 0, 0, width, height, p1, p2, p3, p4, iterations);
        return points;
      }
    
      this.splitRect = function(points, x, y, width, height, p1, p2, p3, p4, iterations)
      {  
        var side1, side2, side3, side4, center;
        var transWidth = ~~(width / 2);
        var transHeight = ~~(height / 2);
        var iter = iterations;

        //as long as square is bigger then a pixel..
        if ((width > 1 || height > 1) && iter > 0)
        {  
          //center is just an average of all 4 corners
         
          center = ((p1 + p2 + p3 + p4) / 4);
          
          //randomly shift the middle point 
          center += this.shift(transWidth + transHeight);
          
          //sides are averages of the connected corners
          //p1----p2
          //|     |
          //p4----p3
          side1 = ((p1 + p2) / 2);
          side2 = ((p2 + p3) / 2);
          side3 = ((p3 + p4) / 2);
          side4 = ((p4 + p1) / 2);
          
          //its possible that middle point was moved out of bounds so correct it here
          center = this.normalize(center);
          side1 = this.normalize(side1);
          side2 = this.normalize(side2);
          side3 = this.normalize(side3);
          side4 = this.normalize(side4);
          
          //repear operation for each of 4 new squares created
          //recursion, baby!
          this.splitRect(points, x, y, transWidth, transHeight, p1, side1, center, side4, iter-1);
          this.splitRect(points, x + transWidth, y, width - transWidth, transHeight, side1, p2, side2, center, iter-1);
          this.splitRect(points, x + transWidth, y + transHeight, width - transWidth, height - transHeight, center, side2, p3, side3, iter-1);
          this.splitRect(points, x, y + transHeight, transWidth, height - transHeight, side4, center, side3, p4, iter-1);
         
        }
        else 
        {
          //when last square is just a pixel, simply average it from the corners
          points[x][y]= (p1 + p2 + p3 + p4) / 4;
        }
      }
    
      this.normalize = function(val)  
      {  
        return (val < 0) ? 0 : (val > 1) ? 1 : val;
      }
      
      this.shift = function(smallSize)
      { 
        return (Math.random() - 0.5) * smallSize / totalSize * roughnessC;
      }
      
      this.getColor = function(c, type)
      {
        var red = 0, green = 0, blue = 0;
      
        switch (type)
        {
          case types.CLOUD:
            if (c < 0.3)
              red = c;
            red = green = c;
    
            blue = 1;
            break;
          case types.PLASMA:
            //r
            if (c < 0.5)
              red = c * 2;
            else
              red = (1.0 - c) * 2;
    
            //g
            if (c >= 0.3 && c < 0.8)
              green = (c - 0.3) * 2;
            else if (c < 0.3)
              green = (0.3 - c) * 2;
            else
              green = (1.3 - c) * 2;
    
            //b
            if (c >= 0.5)
              blue = (c - 0.5) * 2;
            else
              blue = (0.5 - c) * 2;
            break;
          default:
            red = green = blue = c;
            break;
        }
        return {
          r: ~~(red * this.colorModif[0]),
          g: ~~(green * this.colorModif[1]),
          b: ~~(blue * this.colorModif[2])
        };
      }
        
      return this;
    }
    
    function buildPlasmaFractal(canvasId, w, h, ctx, colorRGB)
    {
        var myFractal = new fractalPlasma();
        myFractal.init(canvasId, w, h, ctx, colorRGB);
        console.log(11);
        return myFractal;
    }


    function buildBrownianMotionFractal(canvasId, ctx) 
    {
      let myFractal = new BrownianMovementFractal();
      let frameCount = 0
      let animationFrameId
      // myFractal.init(canvasId, ctx);
      setPoints(canvasId, ctx);
  
      
      //Our draw came here
      const render = () => {
        if(frameCount > brownianFrames) {
          window.cancelAnimationFrame(animationFrameId)
          return;
        }
        frameCount++
        myFractal.draw()
        animationFrameId = window.requestAnimationFrame(render)
      }
      render()
  
      return () => {
        window.cancelAnimationFrame(animationFrameId)
      };
    }

   

    useEffect(() => {
      const canvas = document.getElementById("canvas");
      var ctx = canvas.getContext("2d");
      var fractalBuildAnimation;
      console.log(fractalBuildAnimation);
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      console.log("canvas effect log");
      //Our first draw
      
      if(settings === "1")
        buildPlasmaFractal("canvas", 880, 500, ctx);
      else
        fractalBuildAnimation = buildBrownianMotionFractal("canvas", ctx);

        return fractalBuildAnimation;
    }, [build])
    
    return <canvas id="canvas"  />
};

export default FractalCanvas;