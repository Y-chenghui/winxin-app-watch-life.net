"use strict";var t=require("./context");Component({data:{time:"00:00"},properties:{name:String,author:String,poster:String,autoplay:Boolean,controls:Boolean,loop:Boolean,src:{type:String,observer:function(t){this.setSrc(t)}}},attached:function(){t.set(this.id,this)},detached:function(){this._ctx&&(this.setData({playing:!1,time:"00:00"}),this._ctx.stop()),t.remove(this.data.audioId)},pageLifetimes:{show:function(){this.data.playing&&this._ctx.paused&&this._ctx.play()}},methods:{createAudio:function(){var t=this;this._ctx=wx.getBackgroundAudioManager(),this._ctx.onError(function(i){t.setData({error:!0}),t.triggerEvent("error",i)}),this._ctx.onTimeUpdate(function(){var i=t._ctx.currentTime,e=parseInt(i/60),s=Math.ceil(i%60),a={};a.time=(e>9?e:"0"+e)+":"+(s>9?s:"0"+s),t.lastTime||(a.value=i/t._ctx.duration*100),t.setData(a)}),this._ctx.onEnded(function(){t.data.loop||t.setData({playing:!1,time:"00:00"})}),this._ctx.onStop(function(){t.setData({playing:!1,time:"00:00"}),t.triggerEvent("stop")})},setSrc:function(t){this._ctx.id=this.data.id,this._ctx.autoplay=this.data.autoplay,this._ctx.loop=this.data.loop,this._ctx.title=this.data.name||"音频",this._ctx.singer=this.data.author,this.data.autoplay&&!this.data.playing&&this.setData({playing:!0})},play:function(){this.createAudio(),this._ctx.title=this.data.name||"音频",this._ctx.singer=this.data.author,this._ctx.src=this.data.src,this.setData({playing:!0}),this.triggerEvent("play")},pause:function(){this._ctx&&this._ctx.pause(),this.setData({playing:!1}),this.triggerEvent("pause")},stop:function(){this._ctx&&this._ctx.stop(),this.setData({playing:!1,time:"00:00"}),this.triggerEvent("stop")},seek:function(t){this._ctx&&this._ctx.seek(t)},_seeking:function(t){if(!(t.timeStamp-this.lastTime<200)){var i=Math.round(t.detail.value/100*this._ctx.duration),e=parseInt(i/60),s=i%60;this.setData({time:(e>9?e:"0"+e)+":"+(s>9?s:"0"+s)}),this.lastTime=t.timeStamp}},_seeked:function(t){this._ctx&&this._ctx.seek(t.detail.value/100*this._ctx.duration),this.lastTime=void 0}}});