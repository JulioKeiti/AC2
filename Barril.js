class Barril extends Meshes{
    cylinder = null
    isDestroyied = false;
    sound = null;

    constructor(url,sceneFile, pos, rot, scale, meshNum, mat) {
        super(url,sceneFile, pos, rot, scale, meshNum, mat);

        var cylinderScl = new BABYLON.Vector3(0.4,1, 0.4);

        this.cylinder = BABYLON.MeshBuilder.CreateCylinder("cylinder", {height:0.1});

        this.cylinder.scaling = cylinderScl;
        this.cylinder.position = pos;
        this.cylinder.visibility = 0;
    }

    getCylinder() {
        return this.cylinder;
    }

    explosionSound(scene){
        if(this.isDestroyied == false){
            this.sound = new BABYLON.Sound("som", "/textures/1.mp3", scene, null, {loop: false, autoplay: true });
            this.sound.play();
        }    
    }

    removeAll() {
        if(this.isDestroyied == false){
            var aux = super.getMesh();
            aux.dispose();
            this.cylinder.dispose();
            this.isDestroyied = true;
        }
    }

    explodeBar(box){
        if(this.isDestroyied == false){
     
            var particleSystem = new BABYLON.ParticleSystem("particles", 100000, scene);

            particleSystem.particleTexture = new BABYLON.Texture("/textures/fogo.png", scene);
            
            particleSystem.emitter = new BABYLON.Vector3(box.position.x, box.position.y, box.position.z); 

     
            particleSystem.minSize = 0.05;
            particleSystem.maxSize = 0.05;
       
       
            particleSystem.minLifeTime = 2;
            particleSystem.maxLifeTime = 3;

            particleSystem.emitRate = 10000;

  
            particleSystem.gravity = new BABYLON.Vector3(-0, 0.1, 0);

       
            particleSystem.minAngularSpeed = Math.PI;
            particleSystem.maxAngularSpeed = 2*Math.PI;

 
            particleSystem.minEmitPower = 0.09;
            particleSystem.maxEmitPower = 0.09;
            particleSystem.updateSpeed = 0.025;
            
            particleSystem.start(); 
            particleSystem.targetStopDuration = 1;

        }
    }
}