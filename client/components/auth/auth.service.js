'use strict';

angular.module('doodleplusApp')
  .factory('Auth', function Auth($http, User, $cookieStore, $q) {
    /**
     * Return a callback or noop function
     *
     * @param  {Function|*} cb - a 'potential' function
     * @return {Function}
     */
    var safeCb = function(cb) {
      return (angular.isFunction(cb)) ? cb : angular.noop;
    },

    currentUser = {};

   // check for both to set req.head consistently
    function checkToken() {
      if ($cookieStore.get('usertoken')) {
         currentUser = User.get();
      }
    }

    checkToken();


    return {

      /**
       * Authenticate user and save token
       *
       * @param  {Object}   user     - login info
       * @param  {Function} callback - optional, function(error)
       * @return {Promise}
       */
      login: function(user, callback) {
        return $http.post('/auth/local', {
          email: user.email,
          password: user.password
        })
        .then(function(res) {
          debugger;
          $cookieStore.put('usertoken', res.data.token);
          currentUser = User.get();
          safeCb(callback)();
          return res.data;
        }, function(err) {
          this.logout();
          safeCb(callback)(err.data);
          return $q.reject(err.data);
        }.bind(this));
      },

      /**
       * Delete access token and user info
       */
      logout: function() {
        $cookieStore.remove('usertoken');
        currentUser = {};
      },

      /**
       * Create a new user
       *
       * @param  {Object}   user     - user info
       * @param  {Function} callback - optional, function(error, user)
       * @return {Promise}
       */
      createUser: function(user, callback) {
        return User.save(user,
          function(data) {
            $cookieStore.put('usertoken', data.token);
            currentUser = User.get();
            return safeCb(callback)(null, user);
          },
          function(err) {
            this.logout(); // Auth.logout()
            return safeCb(callback)(err);
          }.bind(this)).$promise;
      },

      getCurrentRespondee: function(callback) {
        var token = $cookieStore.get('token');
        return $http.get('/api/respondee', {UUID: token}).success(function(idObj) {
            safeCb(callback)(idObj);
          }).error(function(err) {
            return safeCb(callback)(err);
          });
      },

      createRespondee: function(callback) {

        var auth = this;
        return $http.post('/api/respondee').success(function(data) {
            $cookieStore.put('token', data.token);
            return auth.getCurrentRespondee(callback);
          }).error(function(err) {
            return safeCb(callback)(err);
          });
      },


      /**
       * Change password
       *
       * @param  {String}   oldPassword
       * @param  {String}   newPassword
       * @param  {Function} callback    - optional, function(error, user)
       * @return {Promise}
       */
      changePassword: function(oldPassword, newPassword, callback) {
        return User.changePassword({ id: currentUser._id }, {
          oldPassword: oldPassword,
          newPassword: newPassword
        }, function(user) {
          return safeCb(callback)(null, user);
        }, function(err) {
          return safeCb(callback)(err);
        }).$promise;
      },

      /**
       * Gets all available info on a user
       *   (synchronous|asynchronous)
       *
       * @param  {Function|*} callback - optional, funciton(user)
       * @return {Object|Promise}
       */
      getCurrentUser: function(callback) {
        if (arguments.length === 0) {
          return currentUser;
        }

        var value = (currentUser.hasOwnProperty('$promise')) ? currentUser.$promise : currentUser;
        return $q.when(value)
          .then(function(user) {
            safeCb(callback)(user);
            return user;
          }, function() {
            safeCb(callback)({});
            return {};
          });
      },

      /**
       * Check if a user is logged in
       *   (synchronous|asynchronous)
       *
       * @param  {Function|*} callback - optional, function(is)
       * @return {Bool|Promise}
       */
      isLoggedIn: function(callback) {
        if (arguments.length === 0) {
          return currentUser.hasOwnProperty('role');
        }

        return this.getCurrentUser(null)
          .then(function(user) {
            var is = user.hasOwnProperty('role');
            safeCb(callback)(is);
            return is;
          });
      },

       /**
        * Check if a user is an admin
        *   (synchronous|asynchronous)
        *
        * @param  {Function|*} callback - optional, function(is)
        * @return {Bool|Promise}
        */
      isAdmin: function(callback) {
        if (arguments.length === 0) {
          return currentUser.role === 'admin';
        }

        return this.getCurrentUser(null)
          .then(function(user) {
            var is = user.role === 'admin';
            safeCb(callback)(is);
            return is;
          });
      },

      /**
       * Get auth token
       *
       * @return {String} - a token string used for authenticating
       */
      getToken: function() {
        var usertoken = $cookieStore.get('usertoken');
        var returned = (typeof usertoken != 'undefined') ? usertoken : $cookieStore.get('token');
        return returned;
      },

      checkUserToken: function() {
        checkToken();
      }
    };
  });
