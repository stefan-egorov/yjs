(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var createIwcConnector;

createIwcConnector = function(callback, options) {
  var IwcConnector, duiClient, init, iwcHandler, received_HB, userIwcHandler;
  userIwcHandler = null;
  if (options != null) {
    userIwcHandler = options.iwcHandler;
  }
  iwcHandler = {};
  duiClient = new DUIClient();
  duiClient.connect(function(intent) {
    var _ref;
    if ((_ref = iwcHandler[intent.action]) != null) {
      _ref.map(function(f) {
        return setTimeout(function() {
          return f(intent);
        }, 0);
      });
    }
    if (userIwcHandler != null) {
      return userIwcHandler(intent);
    }
  });
  duiClient.initOK();
  received_HB = null;
  IwcConnector = (function() {
    function IwcConnector(engine, HB, execution_listener, yatta) {
      var receiveHB, receive_, sendHistoryBuffer, send_;
      this.engine = engine;
      this.HB = HB;
      this.execution_listener = execution_listener;
      this.yatta = yatta;
      this.duiClient = duiClient;
      this.iwcHandler = iwcHandler;
      send_ = (function(_this) {
        return function(o) {
          if (Object.getOwnPropertyNames(_this.initialized).length !== 0) {
            return _this.send(o);
          }
        };
      })(this);
      this.execution_listener.push(send_);
      this.initialized = {};
      receiveHB = (function(_this) {
        return function(json) {
          var him;
          HB = json.extras.HB;
          him = json.extras.user;
          _this.engine.applyOpsCheckDouble(HB);
          return _this.initialized[him] = true;
        };
      })(this);
      iwcHandler["Yatta_push_HB_element"] = [receiveHB];
      this.sendIwcIntent("Yatta_get_HB_element", {});
      receive_ = (function(_this) {
        return function(intent) {
          var o;
          o = intent.extras;
          if (_this.initialized[o.uid.creator] != null) {
            return _this.receive(o);
          }
        };
      })(this);
      this.iwcHandler["Yatta_new_operation"] = [receive_];
      if (received_HB != null) {
        this.engine.applyOpsCheckDouble(received_HB);
      }
      sendHistoryBuffer = (function(_this) {
        return function() {
          var json;
          json = {
            HB: _this.yatta.getHistoryBuffer()._encode(),
            user: _this.yatta.getUserId()
          };
          return _this.sendIwcIntent("Yatta_push_HB_element", json);
        };
      })(this);
      this.iwcHandler["Yatta_get_HB_element"] = [sendHistoryBuffer];
    }

    IwcConnector.prototype.send = function(o) {
      if (o.uid.creator === this.HB.getUserId() && (typeof o.uid.op_number !== "string")) {
        return this.sendIwcIntent("Yatta_new_operation", o);
      }
    };

    IwcConnector.prototype.receive = function(o) {
      if (o.uid.creator !== this.HB.getUserId()) {
        return this.engine.applyOp(o);
      }
    };

    IwcConnector.prototype.sendIwcIntent = function(action_name, content) {
      var intent;
      intent = null;
      if (arguments.length >= 2) {
        action_name = arguments[0], content = arguments[1];
        intent = {
          action: action_name,
          component: "",
          data: "",
          dataType: "",
          flags: ["PUBLISH_GLOBAL"],
          extras: content
        };
      } else {
        intent = arguments[0];
      }
      return this.duiClient.sendIntent(intent);
    };

    IwcConnector.prototype.setIwcHandler = function(f) {
      return userIwcHandler = f;
    };

    return IwcConnector;

  })();
  init = function() {
    var proposed_user_id;
    proposed_user_id = Math.floor(Math.random() * 1000000);
    return callback(IwcConnector, proposed_user_id);
  };
  setTimeout(init, 5000);
  return void 0;
};

module.exports = createIwcConnector;

if (typeof window !== "undefined" && window !== null) {
  if (window.Y == null) {
    window.Y = {};
  }
  window.Y.createIwcConnector = createIwcConnector;
}


},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2Rtb25hZC9Ecm9wYm94L1lhdHRhIS9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9kbW9uYWQvRHJvcGJveC9ZYXR0YSEvbGliL0Nvbm5lY3RvcnMvSXdjQ29ubmVjdG9yLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0tBLElBQUEsa0JBQUE7O0FBQUEsa0JBQUEsR0FBcUIsU0FBQyxRQUFELEVBQVcsT0FBWCxHQUFBO0FBQ25CLE1BQUEsc0VBQUE7QUFBQSxFQUFBLGNBQUEsR0FBaUIsSUFBakIsQ0FBQTtBQUNBLEVBQUEsSUFBRyxlQUFIO0FBQ0UsSUFBYSxpQkFBa0IsUUFBOUIsVUFBRCxDQURGO0dBREE7QUFBQSxFQUlBLFVBQUEsR0FBYSxFQUpiLENBQUE7QUFBQSxFQUtBLFNBQUEsR0FBZ0IsSUFBQSxTQUFBLENBQUEsQ0FMaEIsQ0FBQTtBQUFBLEVBT0EsU0FBUyxDQUFDLE9BQVYsQ0FBa0IsU0FBQyxNQUFELEdBQUE7QUFDaEIsUUFBQSxJQUFBOztVQUF5QixDQUFFLEdBQTNCLENBQStCLFNBQUMsQ0FBRCxHQUFBO2VBQzdCLFVBQUEsQ0FBVyxTQUFBLEdBQUE7aUJBQ1QsQ0FBQSxDQUFFLE1BQUYsRUFEUztRQUFBLENBQVgsRUFFRSxDQUZGLEVBRDZCO01BQUEsQ0FBL0I7S0FBQTtBQUlBLElBQUEsSUFBRyxzQkFBSDthQUNFLGNBQUEsQ0FBZSxNQUFmLEVBREY7S0FMZ0I7RUFBQSxDQUFsQixDQVBBLENBQUE7QUFBQSxFQWVBLFNBQVMsQ0FBQyxNQUFWLENBQUEsQ0FmQSxDQUFBO0FBQUEsRUFpQkEsV0FBQSxHQUFjLElBakJkLENBQUE7QUFBQSxFQXdCTTtBQVFTLElBQUEsc0JBQUUsTUFBRixFQUFXLEVBQVgsRUFBZ0Isa0JBQWhCLEVBQXFDLEtBQXJDLEdBQUE7QUFDWCxV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QixNQUF0QixFQWRhO0lBQUEsQ0E1RGYsQ0FBQTs7QUFBQSwyQkE0RUEsYUFBQSxHQUFlLFNBQUMsQ0FBRCxHQUFBO2FBQ2IsY0FBQSxHQUFpQixFQURKO0lBQUEsQ0E1RWYsQ0FBQTs7d0JBQUE7O01BaENGLENBQUE7QUFBQSxFQWdIQSxJQUFBLEdBQU8sU0FBQSxHQUFBO0FBRUwsUUFBQSxnQkFBQTtBQUFBLElBQUEsZ0JBQUEsR0FBbUIsSUFBSSxDQUFDLEtBQUwsQ0FBVyxJQUFJLENBQUMsTUFBTCxDQUFBLENBQUEsR0FBYyxPQUF6QixDQUFuQixDQUFBO1dBQ0EsUUFBQSxDQUFTLFlBQVQsRUFBdUIsZ0JBQXZCLEVBSEs7RUFBQSxDQWhIUCxDQUFBO0FBQUEsRUFxSEEsVUFBQSxDQUFXLElBQVgsRUFBaUIsSUFBakIsQ0FySEEsQ0FBQTtTQXVIQSxPQXhIbUI7QUFBQSxDQUFyQixDQUFBOztBQUFBLE1BMkhNLENBQUMsT0FBUCxHQUFpQixrQkEzSGpCLENBQUE7O0FBNEhBLElBQUcsZ0RBQUg7QUFDRSxFQUFBLElBQU8sZ0JBQVA7QUFDRSxJQUFBLE1BQU0sQ0FBQyxDQUFQLEdBQVcsRUFBWCxDQURGO0dBQUE7QUFBQSxFQUVBLE1BQU0sQ0FBQyxDQUFDLENBQUMsa0JBQVQsR0FBOEIsa0JBRjlCLENBREY7Q0E1SEEiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiXG4jXG4jIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIFRoZSBjYWxsYmFjayBpcyBjYWxsZWQgd2hlbiB0aGUgY29ubmVjdG9yIGlzIGluaXRpYWxpemVkLlxuIyBAcGFyYW0ge1N0cmluZ30gaW5pdGlhbF91c2VyX2lkIE9wdGlvbmFsLiBZb3UgY2FuIHNldCB5b3Ugb3duIHVzZXJfaWQgKHNpbmNlIHRoZSBpZHMgb2YgZHVpY2xpZW50IGFyZSBub3QgYWx3YXlzIHVuaXF1ZSlcbiNcbmNyZWF0ZUl3Y0Nvbm5lY3RvciA9IChjYWxsYmFjaywgb3B0aW9ucyktPlxuICB1c2VySXdjSGFuZGxlciA9IG51bGxcbiAgaWYgb3B0aW9ucz9cbiAgICB7aXdjSGFuZGxlcjogdXNlckl3Y0hhbmRsZXJ9ID0gb3B0aW9uc1xuXG4gIGl3Y0hhbmRsZXIgPSB7fVxuICBkdWlDbGllbnQgPSBuZXcgRFVJQ2xpZW50KClcbiAgI0BkdWlDbGllbnQgPSBuZXcgaXdjLkNsaWVudCgpXG4gIGR1aUNsaWVudC5jb25uZWN0IChpbnRlbnQpLT5cbiAgICBpd2NIYW5kbGVyW2ludGVudC5hY3Rpb25dPy5tYXAgKGYpLT5cbiAgICAgIHNldFRpbWVvdXQgKCktPlxuICAgICAgICBmIGludGVudFxuICAgICAgLCAwXG4gICAgaWYgdXNlckl3Y0hhbmRsZXI/XG4gICAgICB1c2VySXdjSGFuZGxlciBpbnRlbnRcblxuICBkdWlDbGllbnQuaW5pdE9LKClcblxuICByZWNlaXZlZF9IQiA9IG51bGxcblxuICAjXG4gICMgVGhlIEl3YyBDb25uZWN0b3IgYWRkcyBzdXBwb3J0IGZvciB0aGUgSW50ZXItV2lkZ2V0LUNvbW11bmljYXRpb24gcHJvdG9jb2wgdGhhdCBpcyB1c2VkIGluIHRoZSBSb2xlLVNESy5cbiAgIyBAc2VlIGh0dHA6Ly9kYmlzLnJ3dGgtYWFjaGVuLmRlL2Ntcy9wcm9qZWN0cy90aGUteG1wcC1leHBlcmllbmNlI2ludGVyd2lkZ2V0LWNvbW11bmljYXRpb25cbiAgIyBAc2VlIGh0dHA6Ly9kYmlzLnJ3dGgtYWFjaGVuLmRlL2Ntcy9wcm9qZWN0cy9ST0xFXG4gICNcbiAgY2xhc3MgSXdjQ29ubmVjdG9yXG5cbiAgICAjXG4gICAgIyBAcGFyYW0ge0VuZ2luZX0gZW5naW5lIFRoZSB0cmFuc2Zvcm1hdGlvbiBlbmdpbmVcbiAgICAjIEBwYXJhbSB7SGlzdG9yeUJ1ZmZlcn0gSEJcbiAgICAjIEBwYXJhbSB7QXJyYXk8RnVuY3Rpb24+fSBleGVjdXRpb25fbGlzdGVuZXIgWW91IG11c3QgZW5zdXJlIHRoYXQgd2hlbmV2ZXIgYW4gb3BlcmF0aW9uIGlzIGV4ZWN1dGVkLCBldmVyeSBmdW5jdGlvbiBpbiB0aGlzIEFycmF5IGlzIGNhbGxlZC5cbiAgICAjIEBwYXJhbSB7WWF0dGF9IHlhdHRhIFRoZSBZYXR0YSBmcmFtZXdvcmsuXG4gICAgI1xuICAgIGNvbnN0cnVjdG9yOiAoQGVuZ2luZSwgQEhCLCBAZXhlY3V0aW9uX2xpc3RlbmVyLCBAeWF0dGEpLT5cbiAgICAgIEBkdWlDbGllbnQgPSBkdWlDbGllbnRcbiAgICAgIEBpd2NIYW5kbGVyID0gaXdjSGFuZGxlclxuXG4gICAgICBzZW5kXyA9IChvKT0+XG4gICAgICAgIGlmIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKEBpbml0aWFsaXplZCkubGVuZ3RoIGlzbnQgMFxuICAgICAgICAgIEBzZW5kIG9cbiAgICAgIEBleGVjdXRpb25fbGlzdGVuZXIucHVzaCBzZW5kX1xuXG4gICAgICBAaW5pdGlhbGl6ZWQgPSB7fVxuICAgICAgcmVjZWl2ZUhCID0gKGpzb24pPT5cbiAgICAgICAgSEIgPSBqc29uLmV4dHJhcy5IQlxuICAgICAgICBoaW0gPSBqc29uLmV4dHJhcy51c2VyXG4gICAgICAgIHRoaXMuZW5naW5lLmFwcGx5T3BzQ2hlY2tEb3VibGUgSEJcbiAgICAgICAgQGluaXRpYWxpemVkW2hpbV0gPSB0cnVlXG4gICAgICBpd2NIYW5kbGVyW1wiWWF0dGFfcHVzaF9IQl9lbGVtZW50XCJdID0gW3JlY2VpdmVIQl1cblxuICAgICAgQHNlbmRJd2NJbnRlbnQgXCJZYXR0YV9nZXRfSEJfZWxlbWVudFwiLCB7fVxuXG4gICAgICByZWNlaXZlXyA9IChpbnRlbnQpPT5cbiAgICAgICAgbyA9IGludGVudC5leHRyYXNcbiAgICAgICAgaWYgQGluaXRpYWxpemVkW28udWlkLmNyZWF0b3JdPyAjIGluaXRpYWxpemUgZmlyc3RcbiAgICAgICAgICBAcmVjZWl2ZSBvXG5cbiAgICAgIEBpd2NIYW5kbGVyW1wiWWF0dGFfbmV3X29wZXJhdGlvblwiXSA9IFtyZWNlaXZlX11cblxuICAgICAgaWYgcmVjZWl2ZWRfSEI/XG4gICAgICAgIEBlbmdpbmUuYXBwbHlPcHNDaGVja0RvdWJsZSByZWNlaXZlZF9IQlxuXG4gICAgICBzZW5kSGlzdG9yeUJ1ZmZlciA9ICgpPT5cbiAgICAgICAganNvbiA9XG4gICAgICAgICAgSEIgOiBAeWF0dGEuZ2V0SGlzdG9yeUJ1ZmZlcigpLl9lbmNvZGUoKVxuICAgICAgICAgIHVzZXIgOiBAeWF0dGEuZ2V0VXNlcklkKClcbiAgICAgICAgQHNlbmRJd2NJbnRlbnQgXCJZYXR0YV9wdXNoX0hCX2VsZW1lbnRcIiwganNvblxuICAgICAgQGl3Y0hhbmRsZXJbXCJZYXR0YV9nZXRfSEJfZWxlbWVudFwiXSA9IFtzZW5kSGlzdG9yeUJ1ZmZlcl1cblxuICAgICNcbiAgICAjIFRoaXMgZnVuY3Rpb24gaXMgY2FsbGVkIHdoZW5ldmVyIGFuIG9wZXJhdGlvbiB3YXMgZXhlY3V0ZWQuXG4gICAgIyBAcGFyYW0ge09wZXJhdGlvbn0gbyBUaGUgb3BlcmF0aW9uIHRoYXQgd2FzIGV4ZWN1dGVkLlxuICAgICNcbiAgICBzZW5kOiAobyktPlxuICAgICAgaWYgby51aWQuY3JlYXRvciBpcyBASEIuZ2V0VXNlcklkKCkgYW5kICh0eXBlb2Ygby51aWQub3BfbnVtYmVyIGlzbnQgXCJzdHJpbmdcIilcbiAgICAgICAgQHNlbmRJd2NJbnRlbnQgXCJZYXR0YV9uZXdfb3BlcmF0aW9uXCIsIG9cblxuICAgICNcbiAgICAjIFRoaXMgZnVuY3Rpb24gaXMgY2FsbGVkIHdoZW5ldmVyIGFuIG9wZXJhdGlvbiB3YXMgcmVjZWl2ZWQgZnJvbSBhbm90aGVyIHBlZXIuXG4gICAgIyBAcGFyYW0ge09wZXJhdGlvbn0gbyBUaGUgb3BlcmF0aW9uIHRoYXQgd2FzIHJlY2VpdmVkLlxuICAgICNcbiAgICByZWNlaXZlOiAobyktPlxuICAgICAgaWYgby51aWQuY3JlYXRvciBpc250IEBIQi5nZXRVc2VySWQoKVxuICAgICAgICBAZW5naW5lLmFwcGx5T3Agb1xuXG4gICAgI1xuICAgICMgSGVscGVyIGZvciBzZW5kaW5nIGl3YyBpbnRlbnRzLlxuICAgICMgQG92ZXJsb2FkIHNlbmRJd2NJbnRlbnQgaW50ZW50XG4gICAgIyAgIEBwYXJhbSB7T2JqZWN0fSBpbnRlbnQgVGhlIGludGVudCBvYmplY3QuXG4gICAgIyBAb3ZlcmxvYWQgc2VuZEl3Y0ludGVudCBhY3Rpb25fbmFtZSwgY29udGVudFxuICAgICMgICBAcGFyYW0ge1N0cmluZ30gYWN0aW9uX25hbWUgVGhlIG5hbWUgb2YgdGhlIGFjdGlvbiB0aGF0IGlzIGdvaW5nIHRvIGJlIHNlbmQuXG4gICAgIyAgIEBwYXJhbSB7U3RyaW5nfSBjb250ZW50IFRoZSBjb250ZW50IHRoYXQgaXMgYXR0ZWNoZWQgdG8gdGhlIGludGVudC5cbiAgICAjXG4gICAgc2VuZEl3Y0ludGVudDogKGFjdGlvbl9uYW1lLCBjb250ZW50KS0+XG4gICAgICBpbnRlbnQgPSBudWxsXG4gICAgICBpZiBhcmd1bWVudHMubGVuZ3RoID49IDJcbiAgICAgICAgW2FjdGlvbl9uYW1lLCBjb250ZW50XSA9IGFyZ3VtZW50c1xuICAgICAgICBpbnRlbnQgPVxuICAgICAgICAgIGFjdGlvbjogYWN0aW9uX25hbWVcbiAgICAgICAgICBjb21wb25lbnQ6IFwiXCJcbiAgICAgICAgICBkYXRhOiBcIlwiXG4gICAgICAgICAgZGF0YVR5cGU6IFwiXCJcbiAgICAgICAgICBmbGFnczogW1wiUFVCTElTSF9HTE9CQUxcIl1cbiAgICAgICAgICBleHRyYXM6IGNvbnRlbnRcbiAgICAgIGVsc2VcbiAgICAgICAgaW50ZW50ID0gYXJndW1lbnRzWzBdXG5cbiAgICAgIEBkdWlDbGllbnQuc2VuZEludGVudChpbnRlbnQpXG5cbiAgICBzZXRJd2NIYW5kbGVyOiAoZiktPlxuICAgICAgdXNlckl3Y0hhbmRsZXIgPSBmXG5cblxuICBpbml0ID0gKCktPlxuICAgICMgcHJvcG9zZWRfdXNlcl9pZCA9IGR1aUNsaWVudC5nZXRJd2NDbGllbnQoKS5fY29tcG9uZW50TmFtZSAjVE9ETzogVGhpcyBpcyBzdHVwaWQhIHdoeSBjYW4ndCBpIHVzZSB0aGlzP1xuICAgIHByb3Bvc2VkX3VzZXJfaWQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqMTAwMDAwMClcbiAgICBjYWxsYmFjayBJd2NDb25uZWN0b3IsIHByb3Bvc2VkX3VzZXJfaWRcblxuICBzZXRUaW1lb3V0IGluaXQsIDUwMDBcblxuICB1bmRlZmluZWRcblxuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZUl3Y0Nvbm5lY3RvclxuaWYgd2luZG93P1xuICBpZiBub3Qgd2luZG93Llk/XG4gICAgd2luZG93LlkgPSB7fVxuICB3aW5kb3cuWS5jcmVhdGVJd2NDb25uZWN0b3IgPSBjcmVhdGVJd2NDb25uZWN0b3JcblxuIl19
