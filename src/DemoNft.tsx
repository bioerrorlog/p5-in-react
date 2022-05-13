import React from 'react';
import p5 from 'p5';
import md5 from 'md5';

const sketch = (p: p5) => {
  const nftSeed = 1
  const hashedNftSeed = md5(String(nftSeed))
  console.log(hashedNftSeed)

  const noiseScale = 0.0050; //0.0001~0.1000
 
  // Small effect factor
  const randomSeedVal = 100; // 1~10000

  const noiseSeedVal = 100; //0~100000000000

  const drawIterateVal = 600000; // 100000~1000000

  const lineLengthSeed = 40; // 1~255

  const rotateSeed = 360; // 0~10000

  const strokeColorV1 = 10; // 0~255
  const strokeColorV2 = 100; // 0~255
  const strokeColorV3 = 255; // 0~255
  const strokeColorAlpha = 3.01; // 1.00~10.00

  const backgroundColorV1 = 200; // 0~255
  const backgroundColorV2 = 200; // 0~255
  const backgroundColorV3 = 200; // 0~255
  const backgroundColorAlpha = 255; // 0~255

  p.setup = () => {
    p.createCanvas(500, 500).parent('p5sketch');
    p.background(backgroundColorV1, backgroundColorV2, backgroundColorV3, backgroundColorAlpha);
  
    p.randomSeed(randomSeedVal);
    p.noiseSeed(noiseSeedVal);
   
    for (let i = 0; i < drawIterateVal; i++){
      const x = p.random(p.width);
      const y = p.random(p.height);
      const noiseFactor = p.noise(x*noiseScale, y*noiseScale);
      const lineLength = noiseFactor * lineLengthSeed;
      
      p.push();
      p.translate(x, y);
      p.rotate(noiseFactor * p.radians(rotateSeed));
      p.stroke(strokeColorV1, strokeColorV2, strokeColorV3, strokeColorAlpha);
      p.strokeWeight(1);
      p.line(0, 0, lineLength, lineLength);
      p.pop();
    }
  }
}

// ref. https://discourse.processing.org/t/instance-mode-creating-two-canvas/14121
new p5(sketch);

const DemoNft: React.FC = () => {
  return (
    <div id = "p5sketch">
      {/* p5 instance will be created here --> */}
    </div>
  );
}

export default DemoNft;
