module.exports={

    hasOwnerMailOrIsPermissive : function(data){
        if(data.isPermissive==="false" && data.ownerMail===""){
            return false;
        }else{
            return true;
        }
    }
};