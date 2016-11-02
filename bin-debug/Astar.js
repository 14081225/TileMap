var Grid = (function (_super) {
    __extends(Grid, _super);
    function Grid() {
        _super.call(this);
        this.onePSize = 64;
        this.ArrayGrid = [];
        this.W = 10;
        this.H = 18;
        this.Load();
    }
    var d = __define,c=Grid,p=c.prototype;
    p.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    p.Load = function () {
        for (var i = 0; i < grid.length; i++) {
            var OneP = new One();
            OneP.walkable = grid[i].walkable;
            OneP.img = grid[i].img;
            OneP.x = grid[i].x * 64;
            OneP.y = grid[i].y * 64;
            if (grid[i].walkable == false && OneP.img.length > 1) {
                var img = this.createBitmapByName(OneP.img);
                OneP.addChild(img);
                img.anchorOffsetX = 0;
                img.anchorOffsetY = 0;
            }
            this.ArrayGrid.push(OneP);
            this.addChild(OneP);
        }
    };
    return Grid;
}(egret.DisplayObjectContainer));
egret.registerClass(Grid,'Grid');
var Point = (function () {
    function Point() {
    }
    var d = __define,c=Point,p=c.prototype;
    return Point;
}());
egret.registerClass(Point,'Point');
var One = (function (_super) {
    __extends(One, _super);
    function One() {
        _super.apply(this, arguments);
    }
    var d = __define,c=One,p=c.prototype;
    return One;
}(egret.DisplayObjectContainer));
egret.registerClass(One,'One');
var P = (function () {
    function P() {
        this.point = new Point();
    }
    var d = __define,c=P,p=c.prototype;
    return P;
}());
egret.registerClass(P,'P');
var Astar = (function () {
    function Astar(sp, np) {
        this.EndP = new P();
        this.nowP = new P();
        this.Ps = [];
        this.O = [];
        this.C = [];
        this.EndNcanW = true;
        this.IsOk = false;
        this.Ps = [];
        this.O = [];
        this.C = [];
        this.EndP.point.x = np.x; //取整
        this.EndP.point.y = np.y;
        this.nowP.point.x = Math.floor(sp.x / 64);
        this.nowP.point.y = Math.floor(sp.y / 64);
        this.nowP.g = 0;
        this.nowP.frontG = this.nowP;
        this.sh(this.nowP); //计算h和f
        this.sf(this.nowP);
        this.O.push(this.nowP); //O表，开放
        if (this.canWalk(this.EndP)) {
            this.EndNcanW = false;
        }
        if (this.nowP.point.x == this.EndP.point.x && this.nowP.point.y == this.EndP.point.y) {
            this.IsOk = true;
            this.EndP.frontG = this.nowP;
        }
        var t = 0;
        do {
            this.nowP = this.getP();
            this.AddNstoO(this.nowP);
            this.C.push(this.nowP);
            t++;
            if (this.O.length <= 0 || this.IsOk) {
                break;
            }
        } while (this.EndNcanW);
        var Path = [];
        if (this.EndNcanW) {
            Path.push(this.EndP);
        }
        do {
            Path.push(this.nowP);
            if (this.nowP.frontG.point.x == this.nowP.point.x && this.nowP.frontG.point.y == this.nowP.point.y) {
                break;
            }
            this.nowP = this.nowP.frontG;
        } while (this.EndNcanW);
        var j = 0;
        for (var i = Path.length; i > 0; i--) {
            var op = new Point();
            op.x = Path[i - 1].point.x;
            op.y = Path[i - 1].point.y;
            this.Ps.push(op);
            this.Ps[j].x = this.Ps[j].x * 64;
            this.Ps[j].y = this.Ps[j].y * 64;
            j++;
        }
    }
    var d = __define,c=Astar,p=c.prototype;
    p.AddNstoO = function (n) {
        this.AddNtoO(n, n.point.x - 1, n.point.y - 1);
        this.AddNtoO(n, n.point.x, n.point.y - 1);
        this.AddNtoO(n, n.point.x + 1, n.point.y - 1);
        this.AddNtoO(n, n.point.x - 1, n.point.y);
        this.AddNtoO(n, n.point.x + 1, n.point.y);
        this.AddNtoO(n, n.point.x - 1, n.point.y + 1);
        this.AddNtoO(n, n.point.x, n.point.y + 1);
        this.AddNtoO(n, n.point.x + 1, n.point.y + 1);
    };
    p.AddNtoO = function (fn, x, y) {
        if (x < 0 || y < 0 || x >= 10 || y >= 18) {
            return;
        }
        var n = new P();
        n.point.x = x;
        n.point.y = y;
        if (this.IsinC(n) || this.canWalk(n) || this.IsinO(n)) {
            return;
        }
        else {
            n.frontG = fn;
            this.sg(n);
            this.sh(n);
            this.sf(n);
            this.O.push(n);
            if (this.EndP.point.x == n.point.x && this.EndP.point.y == n.point.y) {
                this.IsOk = true;
            }
        }
    };
    p.IsinO = function (n) {
        for (var i = 0; i < this.O.length; i++) {
            if (n.point.x == this.O[i].point.x && n.point.y == this.O[i].point.y)
                return true;
        }
        return false;
    };
    p.IsinC = function (n) {
        for (var i = 0; i < this.C.length; i++) {
            if (n.point.x == this.C[i].point.x && n.point.y == this.C[i].point.y)
                return true;
        }
        return false;
    };
    p.canWalk = function (n) {
        for (var i = 0; i < grid.length; i++) {
            if (n.point.x == grid[i].x && n.point.y == grid[i].y && grid[i].walkable == false) {
                return true;
            }
        }
        return false;
    };
    p.sh = function (n) {
        var xx = Math.max(n.point.x, this.EndP.point.x) - Math.min(n.point.x, this.EndP.point.x);
        var yy = Math.max(n.point.y, this.EndP.point.y) - Math.min(n.point.y, this.EndP.point.y);
        n.h = xx + yy;
    };
    p.sg = function (n) {
        if (n.point.x != n.frontG.point.x && n.point.y != n.frontG.point.y) {
            n.g = n.frontG.g + 1.4;
        }
        else {
            n.g = n.frontG.g + 1;
        }
    };
    p.sf = function (n) {
        n.f = n.g + n.h;
    };
    p.getP = function () {
        var gn;
        var gf = 999;
        var k;
        for (var i = 0; i < this.O.length; i++) {
            if (this.O[i].f < gf) {
                gf = this.O[i].f;
                k = i;
            }
        }
        gn = this.O[k];
        this.O[k] = this.O[0];
        this.O[0] = gn;
        return this.O.shift();
    };
    return Astar;
}());
egret.registerClass(Astar,'Astar');
//# sourceMappingURL=Astar.js.map