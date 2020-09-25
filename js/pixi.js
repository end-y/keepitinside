let start = () =>{
    document.getElementById("giris").style.display = "none"
    const app = new PIXI.Application({ backgroundColor: 0x1099bb });
document.body.appendChild(app.view);
let skor =0
let textureButton = new PIXI.Texture.from('images/restart.png')
let textureButton2 = new PIXI.Texture.from('images/home.png')
let restart = new PIXI.Sprite(textureButton)
let home = new PIXI.Sprite(textureButton2)
let text = new PIXI.Text('MENU',{fontFamily : 'Arial', fontSize: 24, fill : 0xffffff , align : 'center'});
let skorPuan = new PIXI.Text(skor,{fontFamily : 'Arial', fontSize: 500, fill : 0xffffff });
let pauseMenuContianer = new PIXI.Container();
let pauseMenuBG = new PIXI.Graphics();
let buttonBG = new PIXI.Graphics();
let alpha = new PIXI.filters.AlphaFilter (0.5)
let alpha2 = new PIXI.filters.AlphaFilter (0.05)
text.anchor.set(0.5, 0.5);
skorPuan.anchor.set(0.5, 0.5);
restart.anchor.set(0.5,0.5)
restart.scale.set(0.1,0.1)
restart.buttonMode = true
restart.interactive = true
restart.x = app.renderer.screen.width/2
restart.y = app.renderer.screen.height/2+30
home.anchor.set(0.5,0.5)
home.scale.set(0.4,0.4)
home.buttonMode = true
home.interactive = true
home.x = app.renderer.screen.width/2
home.y = app.renderer.screen.height/2 -40
buttonBG.beginFill(0x2c3e50)
buttonBG.drawRoundedRect(app.renderer.screen.width/2-30, app.renderer.screen.height/2-70, 60, 60,10)
buttonBG.drawRoundedRect(app.renderer.screen.width/2-30, app.renderer.screen.height/2, 60, 60,10)

buttonBG.endFill()
pauseMenuBG.beginFill(0x1099bb)
pauseMenuBG.filters = [alpha]
pauseMenuBG.drawRect(0, 0, app.renderer.screen.width, app.renderer.screen.height)
text.position.set(app.renderer.screen.width/2,app.renderer.screen.height/2-110);
skorPuan.position.set(app.renderer.screen.width/2,app.renderer.screen.height/2)
skorPuan.filters = [alpha2]
pauseMenuBG.endFill()
let container = new PIXI.Container();

let x = 45
let close = true
var stage = app.stage.addChild(container);
let speedX = 5
let speedY = 2
let a = 550
let b = 150
const ball = new PIXI.Graphics();

pauseMenuContianer.addChild(pauseMenuBG)
pauseMenuContianer.addChild(buttonBG)
pauseMenuContianer.addChild(restart)
pauseMenuContianer.addChild(text)
pauseMenuContianer.addChild(home)

createWall(780,app.renderer.screen.height-a,0,0,true);
createWall(10,app.renderer.screen.height-a,0,0,true);
createWall(0,0,100,10,false);
createWall(0,0,100,580,false);
container.children[0].name = "sag"
container.children[1].name = "sol"
container.children[2].name = "yukari"
container.children[3].name = "asagi"
restart.on("click", () => {
    app.destroy();
    document.body.removeChild(document.body.children[3]) 
    start() 
})
home.on("click", () => {
    app.destroy();
    window.location.reload()  
})

ball.beginFill(0xfffffff);
ball.drawCircle(app.renderer.screen.width/2, 185, 20);
ball.acceleration = new PIXI.Point(0);
ball.endFill();

stage.addChild(ball)
stage.addChild(skorPuan)
app.ticker.add(loop)
app.ticker.add(out)
let time = setInterval(() => {
    decrease() 
}, 20000);
let skorInterval = setInterval(() => {
    arttir()
    // console.log("x: "+ball.x , "y: "+ ball.y )
    // console.log("AppX: "+ app.renderer.screen.width+ "AppY: "+ app.renderer.screen.height)
}, 1000);
window.addEventListener("keypress", stop)


// functions
function arttir(){
    skor++
    skorPuan.text = skor
}

function out(){
    if((ball.x+app.renderer.screen.width/2)<0 || (ball.x+app.renderer.screen.width/2) > app.renderer.screen.width){
        let result = new PIXI.Text('YOUR SCORE: '+ skorPuan.text,{fontFamily : 'Impact', fontSize: 60, fill : 0xffffff , align : 'center'});
        result.position.set(app.renderer.screen.width/2-175,app.renderer.screen.height/2-200)
        pauseMenuContianer.addChild(result)
        stage.addChild(pauseMenuContianer)
        setTimeout(() => {
            for(let i = 0; i<container.children.length; i++ ){
                container.children[i].buttonMode = false
                container.children[i].interactive = false
            } 
            app.stop();    
        }, 100);
    }
}
function stop(e){
     if(e.keyCode == 32){
        close = !close;
        if(close){ 
            stage.removeChild(pauseMenuContianer) 
            app.start();
            for(let i = 0; i<container.children.length; i++ ){
                    container.children[i].buttonMode = true
                    container.children[i].interactive = true
                }
                time = setInterval(() => {
                    decrease()
                }, 20000)
                skorInterval = setInterval(() => {
                    arttir()
                }, 1000); 
        }else{
            stage.addChild(pauseMenuContianer)
            setTimeout(() => {
                for(let i = 0; i<container.children.length; i++ ){
                    container.children[i].buttonMode = false
                    container.children[i].interactive = false
                } 
                app.stop()
                clearInterval(skorInterval)
                clearInterval(time)
            }, 100); 
            
        }
    }

    // console.log(close)
    
}

function decrease(){
    x = x+10
    for(let i = 0; i<container.children.length-4; i++ ){
        container.children[i].scale.y -= 0.1
        container.children[i].pivot.y -= x
    }
    for(let i = 2; i<container.children.length-2; i++ ){
        container.children[i].scale.x -= 0.1
        container.children[i].pivot.x -= x
    }
    console.log(container.children[0])
    if(x == 105){
        clearInterval(time)
    }
}

function createWall(x1,y1,x2,y2,bool) {
    const wall = new PIXI.Graphics()
    wall.beginFill(0x2c3e50)
    if(bool){
        wall.drawRoundedRect(x1, y1, 10, app.renderer.screen.height-b, 10);
    }else{
        wall.drawRoundedRect(x2, y2, app.renderer.screen.width-200, 10, 10);
    }
    wall.acceleration = new PIXI.Point(0);
    wall.endFill();
    wall.interactive = true;
    wall.buttonMode = true;
    wall
        .on('pointerdown', onDragStart)
        .on('pointerup', onDragEnd)
        .on('pointerupoutside', onDragEnd)
    if(bool){
        wall.on('pointermove',onDragMoveY)
    }else{
        wall.on('pointermove', onDragMoveX);
    }   
  
    container.addChild(wall);
}

function loop(delta){
    ball.x += speedX;
    ball.y += speedY
    // ball.x -= 0.5;
    if(interact(container.children[1],ball)){
        speedX *= -1;
        speedY *= 1
    }
    if(interact(container.children[0],ball)){
        speedX *= -1;
        speedY *= 1
    }
    if(interact(container.children[3],ball)){
        speedX *= 1;
        speedY *= -1
    }
    if(interact(container.children[2],ball)){
        speedX *= 1;
        speedY *= -1
    }
}



function interact(a,b){
    let rect1 = a.getBounds()
    let rect2 = b.getBounds();
    return  rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.y + rect1.height > rect2.y
}


function onDragStart(event) {
    this.data = event.data;
    this.alpha = 0.5;
    this.dragging = true;
    this.e = event.target
    
    const newPosition = this.data.getLocalPosition(this.parent);
    this.offX = this.parent.children[2].x - newPosition.x;
    this.offX2 = this.parent.children[3].x - newPosition.x;
    this.offY = this.parent.children[1].y - newPosition.y;
    this.offY2 = this.parent.children[0].y - newPosition.y;
    this.name = event.target.name
}

function onDragEnd() {
    this.alpha = 1;
    this.dragging = false;
    this.data = null;

}

function onDragMoveY() {
    if (this.dragging) {

        const newPosition = this.data.getLocalPosition(this.parent);
            if( this.name == "sol"){
                this.parent.children[1].y = newPosition.y + this.offY;
                this.parent.children[0].y = this.parent.children[1].y*-1;
            }else if(this.name == "sag"){
                this.parent.children[0].y = newPosition.y + this.offY2;
                this.parent.children[1].y = this.parent.children[0].y*-1;
            }
    }
}
function onDragMoveX(e) {
    const itr = app.renderer.plugins.interaction
    itr.mouse
    if (this.dragging) {

        const newPosition = this.data.getLocalPosition(this.parent);
            if( this.name == "yukari"){
                this.parent.children[2].x = newPosition.x + this.offX;
                this.parent.children[3].x = this.parent.children[2].x*-1;
            }else if(this.name == "asagi"){
                this.parent.children[3].x = newPosition.x + this.offX2;
                this.parent.children[2].x = this.parent.children[3].x*-1;
            }
    }
}

}

