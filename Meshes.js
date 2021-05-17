class Meshes {
    meshes = null;

    constructor(url,sceneFile, posicao, rotacao, escale, meshNum) {
        BABYLON.SceneLoader.ImportMeshAsync("", url, sceneFile).then((result) => {
            this.meshes = result.meshes[meshNum];       
            this.meshes.position = posicao;
            this.meshes.rotation = rotacao;
            this.meshes.scaling = escale;
        });
    }

    getMesh() {
        return this.meshes;
    }

    removeMesh() {
        this.meshes.dispose();
    }
}