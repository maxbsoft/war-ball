import React, { useEffect, useState, useRef } from 'react';
import logo from '../../logo.svg';

import * as THREE from 'three'
import * as CANNON from 'cannon'
import ReactDOM from 'react-dom'
import { Canvas, extend, useThree, useFrame} from 'react-three-fiber'
import { useCannon, Provider } from './useCannon'
import Plane from './Plane'
import Box from './Box'
import Ball from './Ball'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

extend({ OrbitControls })
const Controls = (props) => {
  const { gl, camera } = useThree()
  const ref = useRef()
  useFrame(() => ref.current.update())
  return <orbitControls ref={ref} args={[camera, gl.domElement]} {...props} />
}

function GameScreen() {

  return (
    <div className="main">
      <Canvas
        shadowMap
        camera={{ position: [0, -10, 6], fov: 65, near: 2, far: 60 }} gl={{ alpha: false }}
        >
        <color attach="background" args={['#87ceeb']} />
        <fog attach="fog" args={['#87ceeb', 40, 45]} />
        {/*<pointLight position={[0, -15, 5]} intensity={0.25} castShadow />*/}
        <ambientLight intensity={0.4}   />
        <spotLight
          castShadow
          angle={Math.PI / 8}
          intensity={0.4}
          position={[20, -30, 190]}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        {/*<spotLight intensity={0.5} position={[0, -9000, 10000]} angle={0.2} penumbra={1.5} castShadow />*/}
        <Provider>
          <Plane position={[0, 0, 0]} />

          <Ball position={[0, 0, 6]} />
        </Provider>

      </Canvas>
    </div>
  );
}

export default GameScreen;
