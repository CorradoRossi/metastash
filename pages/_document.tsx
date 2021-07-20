import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class CustomDocument extends Document {
  render() {
    return (
      <Html lang="en">
        {/*
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //                                                                                                                                                        //
        //                                                                                                                                                        //
        //__/\\\\____________/\\\\_____________________________________________________________________________________________________/\\\_______________________//        
        //__\/\\\\\\________/\\\\\\____________________________________________________________________________________________________\/\\\______________________//       
        //___\/\\\//\\\____/\\\//\\\____________________/\\\______________________________________/\\\__________________________________\/\\\_____________________//      
        //____\/\\\\///\\\/\\\/_\/\\\_____/\\\\\\\\___/\\\\\\\\\\\__/\\\\\\\\\_____/\\\\\\\\\\__/\\\\\\\\\\\__/\\\\\\\\\_____/\\\\\\\\\\_\/\\\____________________//     
        //_____\/\\\__\///\\\/___\/\\\___/\\\/////\\\_\////\\\////__\////////\\\___\/\\\//////__\////\\\////__\////////\\\___\/\\\//////__\/\\\\\\\\\\____________//    
        //______\/\\\____\///_____\/\\\__/\\\\\\\\\\\_____\/\\\________/\\\\\\\\\\__\/\\\\\\\\\\____\/\\\________/\\\\\\\\\\__\/\\\\\\\\\\_\/\\\/////\\\__________//   
        //_______\/\\\_____________\/\\\_\//\\///////______\/\\\_/\\___/\\\/////\\\__\////////\\\____\/\\\_/\\___/\\\/////\\\__\////////\\\_\/\\\___\/\\\_________//  
        //________\/\\\_____________\/\\\__\//\\\\\\\\\\____\//\\\\\___\//\\\\\\\\/\\__/\\\\\\\\\\____\//\\\\\___\//\\\\\\\\/\\__/\\\\\\\\\\_\/\\\___\/\\\________// 
        //_________\///______________\///____\//////////______\/////_____\////////\//__\//////////______\/////_____\////////\//__\//////////__\///____\///________//      
        //                                                                                                                                                        //
        //                                                                                                                                                        //
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        */}
        <Head />
        <body className="loading">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
