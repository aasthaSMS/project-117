$(document).ready(function(){

    console.log('Ready');

    // Fetch the current date and update it in the DOM
    let currentDate = new Date();
    $('#current-date').text(currentDate.toLocaleDateString());

    // Write an event, when Submit button is clicked
    $('#submit-btn').click(function(event){

        // Prevent the default form submission behavior
        event.preventDefault();

        // Get the text value from the textarea using the 'val()' method
        let textValue = $('#text').val();

        // Convert it to JS object.
        // Provide a 'key' here and in write the same in app.py file as well to extract data
        let inputText = { 'input_text': textValue };
        console.log(inputText);

        // AJAX request
        $.ajax({

            // Type of web request
            type : 'POST',

            // URL to which the request is sent
            url: '/process_text',

            // Data to be sent in JSON format
            data : JSON.stringify(inputText),

            // Type of response expected is JSON
            dataType : 'json',

            // Content type
            contentType : 'application/json',

            // If everything is successful, run this function
            success : function(result){

                // Extract prediction and emoticon url from result
                let prediction = result.prediction;
                let emoticonUrl = result.emoticon_url;

                // Update the DOM elements
                $('#prediction').text(prediction);
                $('#emoticon').attr('src', emoticonUrl);

                // Show them
                $('#prediction-container').show();
            },

            // If any error, run this function
            error : function(result){

                console.log(result);
            }
        });

        // Clearing the textbox after every button push
        $('#text').val("");
    });
});
