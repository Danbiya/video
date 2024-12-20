let webcam;
let bodyPose;
let poses = [];
let connections;

function preload() { 
  topImg = loadImage('img/top.png')
  bottomImg = loadImage('img/bottom.png')
bodyPose = ml5.bodyPose();}


function setup() {
  createCanvas(306, 664);

  // 카메라 캔버스 크기 설정 및 캡처 시작
  webcam = createCapture(VIDEO);
  webcam.size(306, 470);
  webcam.hide();
  
   bodyPose.detectStart(webcam, gotPoses);
  // Get the skeleton connection information
  connections = bodyPose.getSkeleton();
}

function draw() {
  background(220);
  image(topImg, 0, 0, 306, 94);
  image(webcam, 0, 94, 306, 470);
  
  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i];
    for (let j = 0; j < connections.length; j++) {
      let pointAIndex = connections[j][0];
      let pointBIndex = connections[j][1];
      let pointA = pose.keypoints[pointAIndex];
      let pointB = pose.keypoints[pointBIndex];
      // Only draw a line if both points are confident enough
      if (pointA.confidence > 0.1 && pointB.confidence > 0.1) {
        stroke(255, 0, 0);
        strokeWeight(2);
        line(pointA.x, pointA.y, pointB.x, pointB.y);
      }
    }
  }

  // Draw all the tracked landmark points
  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i];
    for (let j = 0; j < pose.keypoints.length; j++) {
      let keypoint = pose.keypoints[j];
      // Only draw a circle if the keypoint's confidence is bigger than 0.1
      if (keypoint.confidence > 0.1) {
        fill(0, 255, 0);
        noStroke();
        circle(keypoint.x, keypoint.y, 10);
      }
    }
  }
  }

function gotPoses(results) {
  // Save the output to the poses variable
  poses = results;
}
