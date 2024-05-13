const pool = require("./db/connection");
pool
  .getConnection()
  .then((conn) => {
    console.log(
      `
        -------------------------------------------------
         
            MySql database connection sucessfully!        

        -------------------------------------------------
                        Configuration
         _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _      
            
            Host: ${conn.config.host}                  
            Database: ${conn.config.database}                      
            Port: ${conn.config.port} 
            User: ${conn.config.user} 
         _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ 
        `
    );
  })
  .catch((err) => {
    console.log(err);
  });
