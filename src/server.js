const app = require("./app");
const pool = require("./common/db/connection");

const apiPort = process.env.API_PORT || "3001";

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
    
    app.listen(apiPort, async () => {
      console.log(`Server running on http://localhost:${apiPort}`);
    });
    
  })
  .catch((err) => {
    console.log(err);
  });
