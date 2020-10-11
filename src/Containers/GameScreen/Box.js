import ReactDOM from 'react-dom'
import React, { useEffect, useState } from 'react'
import * as THREE from 'three'
import * as CANNON from 'cannon'
import { Canvas } from 'react-three-fiber'
import { useCannon, Provider } from './useCannon'

export default function Box({ position }) {
  // Register box as a physics body with mass
  const ref = useCannon({ mass: 100000 }, body => {
    body.addShape(new CANNON.Box(new CANNON.Vec3(1, 1, 1)))
    body.position.set(...position)
  })
  return (
    <mesh ref={ref} castShadow receiveShadow>
      <boxGeometry attach="geometry" args={[2, 2, 2]} />
      <meshStandardMaterial attach="material" roughness={0.5} color="#a7dbd8" />
    </mesh>
  )
}
