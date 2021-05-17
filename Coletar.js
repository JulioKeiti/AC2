class Coletar extends Meshes{
    isPaused = true;
    sound = null;
    sphere = null;
    ball = null;
    sNum = 0;
    
    constructor(i, url,sceneFile, pos, rot, scale, meshNum, mat) {
        super(url,sceneFile, pos, rot, scale, meshNum, mat);
        
        this.sNum = i;
        this.Box = BABYLON.MeshBuilder.CreateBox("Box", {});
        this.Box.visibility = 0;
        this.Box.position = pos;
        this.Box.scaling = scale;
        
    }


    getSphere() {
        return this.Box;
    }

    colectSound(scene){
        this.sound = new BABYLON.Sound("som", "/textures/3.mp3", scene, null, {loop: false, autoplay: true});
        this.sound.play();   
    }

    async removeAll() {
        await new Promise((resolve) => {
            setTimeout(resolve,1000);
        });
        var aux = super.getMesh();
        aux.dispose();
        this.Box.dispose();   
        return 1;                     
    }

    animateSphere() {
        var sphereRB = super.getMesh();
        const animSphere = new BABYLON.Animation("Coração", "rotation.y", 100, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

        const sphereKeys = []; 

        sphereKeys.push({
            frame: 0,
            value: 0
        });

        sphereKeys.push({
            frame: 30,
            value: 2 * Math.PI
        });

        animSphere.setKeys(sphereKeys);

 
        sphereRB.animations = [];
        sphereRB.animations.push(animSphere);

        scene.beginAnimation(sphereRB, 0, 30, true);
    }


}
