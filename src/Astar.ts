class Grid extends egret.DisplayObjectContainer{
    public onePSize=64;
    public ArrayGrid:One[]=[];
    public W=10;
    public H=18;
   
   
    constructor(){
        super();
        this.Load();     
    }
     private createBitmapByName(name:string):egret.Bitmap {
        var result = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
    private Load() {
        
        for(var i=0;i<grid.length;i++) {
            var OneP:One=new One();
             OneP.walkable=grid[i].walkable;
           OneP.img=grid[i].img;
            OneP.x=grid[i].x*64;   
            OneP.y=grid[i].y*64;
            if(grid[i].walkable==false&&OneP.img.length>1) {
                var img=this.createBitmapByName( OneP.img);
                OneP.addChild(img);
                img.anchorOffsetX=0;
                img.anchorOffsetY=0;
            }
            this.ArrayGrid.push(OneP);
            this.addChild(OneP);
        }
    }  
}

class Point {
public x:number;
public y:number;
}


class One extends egret.DisplayObjectContainer {
    x:number;
    y:number;
    walkable:boolean;
    img:string;
}


class P {
    public point:Point=new Point();
    public f:number;
    public g:number;
    public h:number;
    public frontG:P;
}

class Astar {
    public EndP:P=new P();
    private nowP:P=new P();
    public Ps:Point[]=[];
    private O:P[]=[];
    private C:P[]=[];
    private EndNcanW=true;
    private IsOk=false;
    constructor(sp:Point,np:Point) {
        this.Ps=[];
        this.O=[];
        this.C=[];
        this.EndP.point.x=np.x;  //取整
        this.EndP.point.y=np.y;
        this.nowP.point.x=Math.floor(sp.x/64);
        this.nowP.point.y=Math.floor(sp.y/64);
        this.nowP.g=0;
        this.nowP.frontG=this.nowP;
        this.sh(this.nowP);  //计算h和f
        this.sf(this.nowP);
        this.O.push(this.nowP); //O表，开放
         if(this.canWalk(this.EndP)) {  //这个点不能走
             this.EndNcanW=false;
         }

         if(this.nowP.point.x==this.EndP.point.x&&this.nowP.point.y==this.EndP.point.y) {
             this.IsOk=true;
             this.EndP.frontG=this.nowP;
         }

          var t=0;
        do{
            this.nowP=this.getP();
            this.AddNstoO(this.nowP);
            this.C.push(this.nowP);    
            t++;
            if(this.O.length<=0 ||this.IsOk) {
                     break;
            }

        }while(this.EndNcanW);

        var Path:P[]=[];
        if(this.EndNcanW) {
          Path.push(this.EndP);
        }
        do{
            Path.push(this.nowP);       
            if(this.nowP.frontG.point.x==this.nowP.point.x&&this.nowP.frontG.point.y==this.nowP.point.y){break;}
            this.nowP=this.nowP.frontG;
        }while(this.EndNcanW);

        var j=0;
        for(var i=Path.length;i>0;i--) {
            var op:Point=new Point();
            op.x=Path[i-1].point.x;
            op.y=Path[i-1].point.y;
            this.Ps.push(op);
   
            this.Ps[j].x=this.Ps[j].x*64;
            this.Ps[j].y=this.Ps[j].y*64;
            j++;
        }

    }

        
    
   
  
     
    public AddNstoO(n:P) {
        this.AddNtoO(n,n.point.x-1,n.point.y-1);
        this.AddNtoO(n,n.point.x,n.point.y-1);
        this.AddNtoO(n,n.point.x+1,n.point.y-1);
        this.AddNtoO(n,n.point.x-1,n.point.y);
        this.AddNtoO(n,n.point.x+1,n.point.y);
        this.AddNtoO(n,n.point.x-1,n.point.y+1);
        this.AddNtoO(n,n.point.x,n.point.y+1);
        this.AddNtoO(n,n.point.x+1,n.point.y+1);
        
    }

 
    public AddNtoO(fn:P,x:number,y:number) {
        if(x<0||y<0||x>=10||y>=18){return;}
        var n:P=new P();
        n.point.x=x;
        n.point.y=y;

        

        if(this.IsinC(n)||this.canWalk(n)||this.IsinO(n)) {
            return ;
        }else {
            n.frontG=fn;
            this.sg(n);this.sh(n);this.sf(n);
            this.O.push(n);
            if(this.EndP.point.x==n.point.x&&this.EndP.point.y==n.point.y) {
                this.IsOk=true;
            }
        }

    }
    public IsinO(n:P):boolean{
        for(var i=0;i<this.O.length;i++) {
            if(n.point.x==this.O[i].point.x&&n.point.y==this.O[i].point.y)
                return true;
        }
        return false ;
    }
    public IsinC(n:P):boolean{
        for(var i=0;i<this.C.length;i++) {
            if(n.point.x==this.C[i].point.x&&n.point.y==this.C[i].point.y)
                return true;
        }
        return false ;      
    }
    public canWalk(n:P):boolean{
        for(var i=0;i<grid.length;i++) {
            if(n.point.x==grid[i].x&&n.point.y==grid[i].y&&grid[i].walkable==false) {
                return true;
            }
        }
        return false;
    }
    public sh(n:P) {
        var xx=Math.max(n.point.x,this.EndP.point.x)-Math.min(n.point.x,this.EndP.point.x);
        var yy=Math.max(n.point.y,this.EndP.point.y)-Math.min(n.point.y,this.EndP.point.y);
        n.h=xx+yy;
    }
    public sg(n:P) {
       if(n.point.x!=n.frontG.point.x&&n.point.y !=n.frontG.point.y) {
           n.g=n.frontG.g+1.4;
       }else {
           n.g=n.frontG.g+1;
       }
       
    }
    public sf(n:P) {
        n.f=n.g+n.h;
    }
    public getP():P{ 
        var gn:P;
        var gf=999;
        var k:number;
        for(var i=0;i<this.O.length;i++) {
            if(this.O[i].f<gf) {
                gf=this.O[i].f;
                k=i;
            }
        }
        gn=this.O[k];
        this.O[k]=this.O[0];
        this.O[0]=gn;      
        return this.O.shift();
    }

}

