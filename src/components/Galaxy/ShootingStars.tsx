import { useRef, useState, useCallback } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ShootingStar {
    id: number;
    start: THREE.Vector3;
    end: THREE.Vector3;
    progress: number;
    speed: number;
    opacity: number;
}

export default function ShootingStars() {
    const groupRef = useRef<THREE.Group>(null!);
    const [stars, setStars] = useState<ShootingStar[]>([]);
    const nextId = useRef(0);
    const timer = useRef(0);

    const spawnStar = useCallback(() => {
        const x1 = (Math.random() - 0.5) * 40;
        const y1 = 10 + Math.random() * 20;
        const z1 = -10 - Math.random() * 20;

        const x2 = x1 + (Math.random() - 0.5) * 15;
        const y2 = y1 - 15 - Math.random() * 10;
        const z2 = z1 + Math.random() * 5;

        const newStar: ShootingStar = {
            id: nextId.current++,
            start: new THREE.Vector3(x1, y1, z1),
            end: new THREE.Vector3(x2, y2, z2),
            progress: 0,
            speed: 0.8 + Math.random() * 1.2,
            opacity: 1,
        };

        setStars(prev => [...prev, newStar]);
    }, []);

    useFrame((_state, delta) => {
        timer.current += delta;

        // Spawn new star occasionally
        if (timer.current > 2 + Math.random() * 3) {
            timer.current = 0;
            spawnStar();
        }

        // Update existing stars
        setStars(prev =>
            prev
                .map(star => ({
                    ...star,
                    progress: star.progress + delta * star.speed,
                    opacity: Math.max(0, 1 - star.progress),
                }))
                .filter(star => star.progress < 1.2)
        );
    });

    return (
        <group ref={groupRef}>
            {stars.map(star => {
                const pos = new THREE.Vector3().lerpVectors(
                    star.start,
                    star.end,
                    Math.min(star.progress, 1)
                );
                const tailPos = new THREE.Vector3().lerpVectors(
                    star.start,
                    star.end,
                    Math.max(0, star.progress - 0.15)
                );

                return (
                    <line key={star.id}>
                        <bufferGeometry>
                            <bufferAttribute
                                attach="attributes-position"
                                args={[new Float32Array([
                                    tailPos.x, tailPos.y, tailPos.z,
                                    pos.x, pos.y, pos.z,
                                ]), 3]}
                            />
                        </bufferGeometry>
                        <lineBasicMaterial
                            color="#ffffff"
                            transparent
                            opacity={star.opacity * 0.7}
                            linewidth={1}
                        />
                    </line>
                );
            })}
        </group>
    );
}
