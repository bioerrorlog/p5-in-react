import React from 'react';
import p5 from 'p5';
import md5 from 'md5';

const sketch = (p: p5) => {
  const TokenId = 1 // pseudo TokenId

  const hashedNftSeed = md5(String(TokenId))
  console.log(hashedNftSeed)

  const getSlicedNum = (x: number, y: number) : number => {
    return parseInt(hashedNftSeed.slice(x, y), 16)
  }

  const lineLengthSeed = getSlicedNum(0, 2) + 1; // 1~257

  const strokeColorV1 = getSlicedNum(2, 4); // 0~255
  const strokeColorV2 = getSlicedNum(4, 6); // 0~255
  const strokeColorV3 = getSlicedNum(6, 8); // 0~255

  const noiseScale = (getSlicedNum(8, 11) % 1000) / 10000; //0.0001~0.1000

  const rotateSeed = getSlicedNum(11, 13); // 0~255

  const backgroundColorV1 = getSlicedNum(15, 17); // 0~255
  const backgroundColorV2 = getSlicedNum(17, 19); // 0~255
  const backgroundColorV3 = getSlicedNum(19, 21); // 0~255

  const drawIterateVal = getSlicedNum(21, 26) + 100000; // 100000~1000000

  const randomSeedVal = getSlicedNum(26, 29); // 0~4096
  const noiseSeedVal = getSlicedNum(29, 32); // 0~4096

  p.setup = () => {
    p.createCanvas(500, 500).parent('p5sketch');
    p.background(backgroundColorV1, backgroundColorV2, backgroundColorV3, 255);
  
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
      p.stroke(strokeColorV1, strokeColorV2, strokeColorV3, 3);
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
