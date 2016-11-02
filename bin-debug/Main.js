//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////、
var Pole = (function (_super) {
    __extends(Pole, _super);
    function Pole() {
        _super.call(this);
        this.MySta = new StaMac;
        this.MoveSpeed = 20;
        this.ChaTime = 150;
        this.Modle = 0;
        this.IdleAni = new Array();
        this.MoveAni = new Array();
        this.MyPhoto = this.createBitmapByName("10001_png");
        this.addChild(this.MyPhoto);
        this.LoadAni();
        this.anchorOffsetX = this.MyPhoto.width / 2;
        this.anchorOffsetY = this.MyPhoto.height / 2 + this.MyPhoto.height / 3;
    }
    var d = __define,c=Pole,p=c.prototype;
    p.LoadAni = function () {
        var texture = RES.getRes("10001_png");
        this.IdleAni.push(texture);
        texture = RES.getRes("10002_png");
        this.IdleAni.push(texture);
        texture = RES.getRes("10003_png");
        this.IdleAni.push(texture);
        texture = RES.getRes("10004_png");
        this.IdleAni.push(texture);
        texture = RES.getRes("10005_png");
        this.IdleAni.push(texture);
        texture = RES.getRes("10006_png");
        this.IdleAni.push(texture);
        texture = RES.getRes("10007_png");
        this.IdleAni.push(texture);
        texture = RES.getRes("10008_png");
        this.IdleAni.push(texture);
        texture = RES.getRes("10009_png");
        this.IdleAni.push(texture);
        texture = RES.getRes("10010_png");
        this.IdleAni.push(texture);
        texture = RES.getRes("100012_png");
        this.MoveAni.push(texture);
        texture = RES.getRes("100022_png");
        this.MoveAni.push(texture);
        texture = RES.getRes("100032_png");
        this.MoveAni.push(texture);
        texture = RES.getRes("100042_png");
        this.MoveAni.push(texture);
        texture = RES.getRes("100052_png");
        this.MoveAni.push(texture);
        texture = RES.getRes("100062_png");
        this.MoveAni.push(texture);
        texture = RES.getRes("100072_png");
        this.MoveAni.push(texture);
        texture = RES.getRes("100082_png");
        this.MoveAni.push(texture);
        texture = RES.getRes("100092_png");
        this.MoveAni.push(texture);
        texture = RES.getRes("100102_png");
        this.MoveAni.push(texture);
        texture = RES.getRes("10011_png");
        this.MoveAni.push(texture);
        texture = RES.getRes("10012_png");
        this.MoveAni.push(texture);
        texture = RES.getRes("10013_png");
        this.MoveAni.push(texture);
        texture = RES.getRes("10014_png");
        this.MoveAni.push(texture);
        texture = RES.getRes("10015_png");
        this.MoveAni.push(texture);
    };
    p.PlayAni = function (Ani) {
        var count = 0;
        var Bit = this.MyPhoto;
        var M = this.Modle;
        var timer = new egret.Timer(125, 0);
        timer.addEventListener(egret.TimerEvent.TIMER, Play, this);
        timer.start();
        function Play() {
            Bit.texture = Ani[count];
            if (count < Ani.length - 1) {
                count++;
            }
            else {
                count = 0;
            }
            if (this.Modle != M) {
                timer.stop();
            }
        }
    };
    p.Move = function (Ps, xx, yy) {
        var MS = new MoveSta(Ps, this);
        this.MySta.Reload(MS);
    };
    p.Idle = function () {
        var IS = new IdleSta(this);
        this.MySta.Reload(IS);
    };
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    p.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    return Pole;
}(egret.DisplayObjectContainer));
egret.registerClass(Pole,'Pole');
var MoveSta = (function () {
    function MoveSta(Ps, Player) {
        this.ArriveListener = new egret.Sprite();
        this.Path = Ps;
        this.Player = Player;
    }
    var d = __define,c=MoveSta,p=c.prototype;
    p.Move = function () {
        var _this = this;
        this.nowNode++;
        if (this.nowNode < this.Path.length) {
            var M = this.Player.Modle;
            this.Tx = this.Path[this.nowNode].x + 32;
            this.Ty = this.Path[this.nowNode].y + 32;
            var xx = this.Tx - this.Player.x;
            var yy = this.Ty - this.Player.y;
            if (xx > 0) {
                this.Player.scaleX = 1;
            }
            else {
                this.Player.scaleX = -1;
            }
            var zz = Math.pow(xx * xx + yy * yy, 0.5);
            var time = zz / this.Player.MoveSpeed;
            this.timer = new egret.Timer(50, time);
            this.LeastTime = time;
            this.timer.start();
            this.timer.addEventListener(egret.TimerEvent.TIMER, function () {
                _this.Player.x += xx / time;
                _this.Player.y += yy / time;
                _this.LeastTime--;
                if (_this.LeastTime < 1) {
                    _this.timer.stop();
                    if (_this.LeastTime > -10) {
                        _this.Move();
                    }
                }
            }, this);
        }
        else {
            this.Player.Idle();
            return;
        }
    };
    p.Load = function () {
        if (this.Path.length > 1)
            this.nowNode = 1;
        else
            this.nowNode = 0;
        this.Player.Modle++;
        this.Player.PlayAni(this.Player.MoveAni);
        this.Move();
    };
    p.exit = function () {
        this.LeastTime = -10;
    };
    return MoveSta;
}());
egret.registerClass(MoveSta,'MoveSta',["Sta"]);
var IdleSta = (function () {
    function IdleSta(Player) {
        this.Player = Player;
    }
    var d = __define,c=IdleSta,p=c.prototype;
    p.Load = function () {
        this.Player.Modle++;
        this.Player.PlayAni(this.Player.IdleAni);
    };
    p.exit = function () {
    };
    return IdleSta;
}());
egret.registerClass(IdleSta,'IdleSta',["Sta"]);
var StaMac = (function () {
    function StaMac() {
    }
    var d = __define,c=StaMac,p=c.prototype;
    p.Reload = function (S) {
        if (this.nowSta) {
            this.nowSta.exit();
        }
        this.nowSta = S;
        this.nowSta.Load();
    };
    return StaMac;
}());
egret.registerClass(StaMac,'StaMac');
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        _super.call(this);
        this.BigMap = new Grid();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var d = __define,c=Main,p=c.prototype;
    p.onAddToStage = function (event) {
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);
        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    };
    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    p.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    };
    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    p.onResourceLoadComplete = function (event) {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    p.onItemLoadError = function (event) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    p.onResourceLoadError = function (event) {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    };
    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    p.onResourceProgress = function (event) {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    };
    /**
     * 创建游戏场景
     * Create a game scene
     */
    p.createGameScene = function () {
        var sky = this.createBitmapByName("bgImage");
        this.addChild(sky);
        var stageW = this.stage.stageWidth;
        var stageH = this.stage.stageHeight;
        sky.width = stageW;
        sky.height = stageH;
        this.BigMap = new Grid();
        this.Player = new Pole();
        this.addChild(this.BigMap);
        this.addChild(this.BigMap);
        this.addChild(this.Player);
        this.Player.x = this.Player.y = 300;
        this.Player.Idle();
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.Click, this);
    };
    p.Click = function (evt) {
        var sp = new Point();
        var ep = new Point();
        sp.x = this.Player.x;
        sp.y = this.Player.y;
        ep.x = Math.floor(evt.stageX / 64);
        ep.y = Math.floor(evt.stageY / 64);
        var As = new Astar(sp, ep);
        this.Player.Move(As.Ps);
    };
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    p.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    /**
     * 切换描述内容
     * Switch to described content
     */
    p.changeDescription = function (textfield, textFlow) {
        textfield.textFlow = textFlow;
    };
    return Main;
}(egret.DisplayObjectContainer));
egret.registerClass(Main,'Main');
//# sourceMappingURL=Main.js.map