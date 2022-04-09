export const landingPage = (baseUrl: string) => {

    return `
    
    <!doctype html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
                    <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>E-Kaly API</title>
        
        <style>
            
            h2 {
                margin-top: 5em;
                font: 33px sans-serif;
                text-align: center;
                text-transform: uppercase;
                position: absolute;
            }
            
            h2.background {
                position: relative;
                z-index: 1;
            }
            
            h2.background:before {
                border-top: 2px solid #dfdfdf;
                content: "";
                margin: 0 auto;
                /* this centers the line to the full width specified */
                position: absolute;
                /* positioning must be absolute here, and relative positioning must be applied to the parent */
                top: 50%;
                left: 0;
                right: 0;
                bottom: 0;
                width: 95%;
                z-index: -1;
            }
            
            h2.background span {
                /* to hide the lines from behind the text, you have to set the background color the same as the container */
                background: #fff;
                padding: 0 15px;
            }
            
            h2.double:before {
                /* this is just to undo the :before styling from above */
                border-top: none;
            }
            
            h2.double:after {
                border-bottom: 1px solid blue;
                -webkit-box-shadow: 0 1px 0 0 red;
                -moz-box-shadow: 0 1px 0 0 red;
                box-shadow: 0 1px 0 0 red;
                content: "";
                margin: 0 auto;
                /* this centers the line to the full width specified */
                position: absolute;
                top: 45%;
                left: 0;
                right: 0;
                width: 95%;
                z-index: -1;
            }
            
            .theme_btn {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }
            
            .btn {
                position: relative;
                display: inline-block;
                padding: 12px 32px;
                color: #fff;
                text-align: center;
                text-transform: uppercase;
                text-decoration: none;
                overflow: hidden;
                z-index: 1;
            }
            
            .btn:focus {
                outline: none;
            }
            
            .btn--primary {
                color: lightslategray;
            }
            
            .btn--border {
                border-width: 1px;
                border-style: solid;
                border-radius: 10px;
                box-sizing: border-box;
            }
            
            .btn--animated {
                transition-property: color;
                transition-duration: 0.5s;
            }
            
            .btn--animated.btn--border .btn--primary {
                border: 1px solid lightslategray;
                border-radius: 10px;
            }
            
            .btn--animated:before {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: lightslategray;
                transform: scaleX(0);
                transform-origin: 0 120%;
                transition-property: transform;
                transition-duration: 0.5s;
                transition-timing-function: ease-out;
                border-radius: 10px;
                z-index: -1;
            }
            
            .btn--animated:hover {
                color: white;
            }
            
            .btn--animated:hover:before {
                transform: scaleX(1);
                transition-timing-function: cubic-bezier(0.45, 1.64, 0.47, 0.66);
                border-radius: 10px;
            }
            
        </style>
    </head>
    <body>
        
        <h2 class="background double"><span>E-KALY API WORKS FINE!</span></h2>
    
        <div class="theme_btn">
            <a href="${baseUrl}/api-docs" class="btn btn--border btn--primary btn--animated">See documentation</a>
        </div>
        
    </body>
    </html>
    
    `

}