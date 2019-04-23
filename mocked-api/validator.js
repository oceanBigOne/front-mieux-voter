module.exports={

    hasOwnerMailOrIsPermissive : function(data){
        if(data.isPermissive==="false" && data.ownerMail===""){
            return false;
        }else{
            return true;
        }
    },

    isDateFuture  : function(data,nameField){

        if(data[nameField]!=-1) {
            if (Date.parse(data[nameField]) > Date.now()) {
                return true;
            } else {
                return false;
            }
        }else {
            return true;
        }
    },

    isDateStartBeforeDateEnd  : function(data,nameFieldDateStart,nameFieldDateEnd){
       let dateStart=data[nameFieldDateStart];
       let dateEnd=data[nameFieldDateEnd];
        if(dateStart==-1 || dateEnd==-1) {
          return true
        }else{
            if (Date.parse(dateStart) < Date.parse(dateEnd)) {
                return true;
            } else {
                return false;
            }
        }


    }

};