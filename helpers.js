module.exports = {
    getAvatarURL: function(user){
        if (user.avatar.startsWith('http')){
            return user.avatar;
        } else{
            return '/uploads/' +user.avatar;
        }
    }
};