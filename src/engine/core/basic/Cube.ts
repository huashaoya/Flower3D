import * as THREE from "three";
import * as CANNON from "cannon-es"
import { MemberWrapper } from "../MemberWrapper";
import { Manager } from "../Manager";
import { threeToCannon, ShapeType } from '../../utils/cannon-to-three/src/index';

export class Cube extends MemberWrapper {
    constructor(props: Record<string, any>, manager: Manager) {

        const geometry = new THREE.BoxGeometry(props.w, props.h, props.d);
        const material = manager.settings?.pbr
            ? new THREE.MeshStandardMaterial({ color: "white" })
            : new THREE.MeshBasicMaterial({ color: "white" });
        const element = new THREE.Mesh(geometry, material);
        
        const shape= threeToCannon(element, {type: ShapeType.BOX});
            //@ts-ignore
        super(props, manager, element, shape?.shape)
        this.setters={
            ...this.setters,
            color:this.setColor
        }
    }
    setColor(color:string){
        //@ts-ignore
        this.object3D?.material.color.set(color); 
    }
}