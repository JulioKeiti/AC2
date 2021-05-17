class Hero {
    hero = null;
    Teste = 0;
    reinicia = false;
    
    constructor(cam, scene, bar, spheres) {
        var inputMap = {};
            scene.actionManager = new BABYLON.ActionManager(scene);
            scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, function (evt) {
                inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
            }));
            scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, function (evt) {
                inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
            }));

        BABYLON.SceneLoader.ImportMeshAsync("", "https://assets.babylonjs.com/meshes/", "HVGirl.glb").then((result) => {
           this.hero = result.meshes[0];  
           var posHero = new BABYLON.Vector3(0, -1.98, 0);
           var sclHero = new BABYLON.Vector3(0.05,0.05,0.05);
                 
            this.hero.scaling.scaleInPlace(0.1);
            this.hero.position = posHero;
            this.hero.scaling = sclHero;
                
            cam.target = this.hero;

            var heroSpeed = 0.1;
            var heroSpeedBackwards = 0.03;
            var heroRotationSpeed = 0.1;

            var animating = true;

            const walkAnim = scene.getAnimationGroupByName("Walking");
            const walkBackAnim = scene.getAnimationGroupByName("WalkingBack");
            const idleAnim = scene.getAnimationGroupByName("Idle");
            const sambaAnim = scene.getAnimationGroupByName("Samba");

            scene.onBeforeRenderObservable.add(() => {
                var keydown = false;

                if(this.Teste==10){
                    sambaAnim.start(true, 1.0, sambaAnim.from, sambaAnim.to, true);
                    keydown = true;
                }

                if (inputMap["w"] && this.Teste < 10) {
                    if (this.hero.intersectsMesh(spheres[this.Teste].getSphere(), false)) {
                        spheres[this.Teste].colectSound(scene);
                        spheres[this.Teste].animateSphere();
                        spheres[this.Teste].removeAll();
                        this.Teste = this.Teste+1;
                    }    
                    
                    if (this.hero.intersectsMesh(bar.getCylinder(), false)) {
                        bar.explodeBar(bar.getCylinder());
                        bar.explosionSound(scene);
                        bar.removeAll();
                    } 

                    this.hero.moveWithCollisions(this.hero.forward.scaleInPlace(heroSpeed));
                    keydown = true;
                }
                if (inputMap["s"] && this.Teste < 10) {
                    
                    if (this.hero.intersectsMesh(spheres[this.Teste].getSphere(), false)) {
                        spheres[this.Teste].colectSound(scene);
                        spheres[this.Teste].removeAll(this.Teste);;
                        this.Teste = this.Teste+1;
                    }    
                    
                    if (this.hero.intersectsMesh(bar.getCylinder(), false)) {
                        bar.explodeBar(bar.getCylinder());
                        bar.explosionSound(scene);
                        bar.removeAll();

                    } 
                    this.heroSpeedBackwards = 0.003
                    this.heroRotationSpeed = 0.1;
                    this.hero.moveWithCollisions(this.hero.forward.scaleInPlace(-heroSpeedBackwards));

                    keydown = true;
                }
                if (inputMap["a"] && this.Teste < 10) {
                    this.hero.rotate(BABYLON.Vector3.Up(), -heroRotationSpeed);
                    keydown = true;
                }
                if (inputMap["d"] && this.Teste < 10) {
                    this.hero.rotate(BABYLON.Vector3.Up(), heroRotationSpeed);
                    keydown = true;
                }
                if (inputMap["b"]) {
                    keydown = true;
                }

       
                if (keydown) {
                    if (!animating) {
                        animating = true;
                        if (inputMap["s"]) {
                            walkBackAnim.start(true, 1.0, walkBackAnim.from, walkBackAnim.to, false);
                        }
                        else if(inputMap["b"]) {
                            sambaAnim.start(true, 1.0, sambaAnim.from, sambaAnim.to, false);
                        }
                        else {                    
                            walkAnim.start(true, 1.0, walkAnim.from, walkAnim.to, false);
                        }
                    }
                }
                else {
                    if (animating) {    
                        idleAnim.start(true, 1.0, idleAnim.from, idleAnim.to, false);
                        sambaAnim.stop();
                        walkAnim.stop();
                        walkBackAnim.stop();
                        animating = false;
                    }
                }
            });
        });
    }
    getIndex() {
        return this.Teste;
    }

    setIndex(n) {
        this.Teste = n;
    }

    setHeroPos(){
        this.hero.position = new BABYLON.Vector3(0, -1.98, 0);
    }
}
