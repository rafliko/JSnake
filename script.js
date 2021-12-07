var canv = document.getElementById("canv");
var ctx = canv.getContext("2d");
var size = 30;
var w = 20;
var h = 20;
var speed = 15;
var scol = "green";
var fcol = "red";
canv.width = w*size;
canv.height = h*size;
var p = document.getElementById("points");
var fcount = 1;
var dir = 0;
var s = new Array();
var f = new Array(fcount);

document.addEventListener("keydown", keyPush);

var repeat = setInterval(main, 1000/speed);

reset();

function reset()
{
    s = new Array();
    s[0] = {x:0,y:0};
    s[1] = {x:0,y:0};
    f = new Array(fcount);
    for(let i=0; i<fcount; i++)
    {
        f[i] = {x:0,y:0};
        f[i].x = Math.floor(Math.random() * w);
        f[i].y = Math.floor(Math.random() * h);
    }
    dir = 0;
}

function main()
{
    move();
    draw();
}

function draw()
{
    ctx.clearRect(0,0,w*size,h*size);
    ctx.fillStyle = "red";
    ctx.fillStyle = fcol;
    for(let i=0; i<fcount; i++)
    {   
        ctx.fillRect(f[i].x*size,f[i].y*size,size,size);
    }
    ctx.fillStyle = "green";
    ctx.fillStyle = scol;
    for(let i=s.length-1; i>=0; i--)
    {          
        ctx.fillRect(s[i].x*size,s[i].y*size,size,size);
    }
    p.innerHTML = "Length: " + s.length;
}

function move()
{
    for(let i=0; i<fcount; i++)
    {
        if(s[0].x == f[i].x && s[0].y == f[i].y)
        {
            f[i].x = Math.floor(Math.random() * w);
            f[i].y = Math.floor(Math.random() * h);
            s[s.length] = {x:0,y:0};
        }
    }

    for(let i=s.length-1; i>0; i--)
    {
        s[i].x = s[i-1].x;
        s[i].y = s[i-1].y;
    }

    switch(dir)
    {
        case 0:
            s[0].x++;
            break;
        case 1:
            s[0].x--;
            break;
        case 2:
            s[0].y++;
            break;
        case 3:
            s[0].y--;
            break;
    }

    if(s[0].x>=w || s[0].x<0 || s[0].y>=h || s[0].y<0)
    {
        reset();
    }

    for(let i=s.length-1; i>0; i--)
    {
        if(s[0].x == s[i].x && s[0].y == s[i].y)
            reset();
    }
}

function keyPush(e) {
    switch(e.keyCode)
    {
        case 37:
            dir = 1;
            break;
        case 38:
            dir = 3;
            break;
        case 39:
            dir = 0;
            break;
        case 40:
            dir = 2;
            break;

    }
}

function apply()
{
	canv.style.backgroundColor = document.getElementById("bcol").value;
    scol = document.getElementById("scol").value;
    fcol = document.getElementById("fcol").value;
    fcount = document.getElementById("fcount").value;
    w = document.getElementById("width").value;
    h = document.getElementById("height").value;
    size = document.getElementById("size").value;
	speed = document.getElementById("speed").value;
	
	canv.width = w*size;
	canv.height = h*size;
	
	clearInterval(repeat);
    repeat = setInterval(main, 1000/speed);
	
    reset();
}