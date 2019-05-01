module.exports={

    hasOwnerMailOrIsPermissive : function(data){
        if(data.isPermissive==="false"){
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(re.test(String(data.ownerMail).toLowerCase())){
                return true;
            }else {
                return false;
            }
        }else{
            return true;
        }
    },

    hasVotersMailsOrIsPermissive : function(data){
        if(data.isPermissive==="false"){
            let error=0;
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            if(Array.isArray(data.voters)){
                data.voters.forEach(function (email){
                    if(!re.test(String(email).toLowerCase())){
                        error++;
                    }
                });
            }else{
                error++;
            }
            if(error===0){
                return true;
            }else{
                return false;
            }
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