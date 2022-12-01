$(function() {

    // TRANSLATE TEXT TO BINARY AND BACK
    $('#translate').on('click', function() {
        let action = $('#translate').attr('action')
        if(action === 'tobinary') {
            translateToBinary()
        }
        else if(action === 'totext') {
            translateToText()
        }
        if(action === 'numtobinary') {
            numbersToBinary()
        }
        else if(action === 'bintonum') {
            binaryToNumbers()
        }
    })

    // Swapping translation text to binary and binary to text
    const swap = $('#swap')
    swap.on('click', function() {
        const btn = $('#translate')
        const action = btn.attr('action')
        const text = $('#keys')
        const translation = $('#result')
        
        if(action == 'tobinary') {
            btn.attr('action', 'totext')
            btn.text('binary to text')
            translation.text('')
            text.val('').attr('placeholder', 'Paste or write your binary text separated with white space. Click button to convert text to binary.')
        }
        else if(action == 'totext') {
            btn.attr('action', 'tobinary')
            btn.text('text to binary')
            translation.text('')
            text.val('').attr('placeholder', 'Paste or write your text. Click button to convert text to binary.')
        }
        else if(action == 'numtobinary') {
            btn.attr('action', 'bintonum')
            btn.text('binary to numbers')
            translation.text('')
            text.val('').attr('placeholder', 'Paste or write your binary numbers separated with white space. Click button to convert binary to numbers.')
        }
        else if(action == "bintonum") {
            btn.attr('action', 'numtobinary')
            btn.text('numbers to binary')
            translation.text('')
            text.val('').attr('placeholder', 'Paste or write your number. Click the button to convert.')
        }
    })


    // CONVERT NUMBERS TO BINARY
    let conNum = $('#textToNumbers')
    conNum.on('click', function() {
        let action = conNum.attr('action')
        $('#keys').val('')
        $('#result').text('')

        if(action == 'texttonumbers') {
            $('#translate').text('Numbers to Binary').attr('action', 'numtobinary')
            conNum.text('Convert Text').attr('action', 'numberstotext')
            $('textarea').attr('placeholder','Paste or write your number. Click the button to convert.')
        }
        else {
            $('#translate').text('Text to Binary').attr('action', 'tobinary')
            conNum.text('Convert Numbers').attr('action', 'texttonumbers')
            $('textarea').attr('placeholder','Paste or write your text. Click the button and convert text to binary.')
        }

    })

});




function translateToBinary() {
    const bits = [128, 64, 32, 16, 8, 4, 2, 1]; 
    const input = $('#keys')

    let easter = input.val()
    let chars = input.val().split("")
    const charCodes = []
    const binaryArray = []

    $.each(chars, function(i, letter) {
        charCodes.push(letter.charCodeAt())
    })

    
    
    $.each(charCodes, function(i, code) {
        const b = bits.length;
        let rest = code
        let binary = ''
        
        for(let n=0; n<b; n++) {
            if(rest >= bits[n]) {
                rest = rest-bits[n]
                binary += '1'
            }
            else {
                binary += '0'
                rest = rest
            }
        }
        binaryArray.push(binary);
    })

    //console.log(binaryArray)

    $('#result').text(binaryArray.join(' '))
}


function translateToText() {
    const bits = [128, 64, 32, 16, 8, 4, 2, 1]; 
    const input = $('#keys')

    let chars = input.val().split(" ")
    const charCodes = []
    let text = ''

    $.each(chars, function(i, digits) {
        const b = bits.length
        let total = 0;

        for(let n=0; n<b; n++) {
            if(digits[n] == 1) {
                total = total + bits[n]
            }
        }
        charCodes.push(total)
    })

    $.each(charCodes, function(i, code) {
        text += String.fromCharCode(code);
    })

    $('#result').text(text)

}


function numbersToBinary() {
    const numbers = $('#keys').val().split(" ")
    const binArray = []
    const result = $('#result')

    $.each(numbers, function(i, num) {
        let quot = num
        let array = []
        for(quot; quot>0; quot/2) {
            if(quot%2 === 0) {
                array.push(0)
            }
            else {
                array.push(1)
            }
            quot = Math.trunc(quot/2)
        }
        binArray.push(array.reverse().join(""))
    })
    result.text(binArray.join(" "))
}

function binaryToNumbers() {
    const binArray = $('#keys').val().split(" ")
    const result = $('#result')
    const resultsArray = []
    
    $.each(binArray, function(i, bin) {
        const length = bin.length
        let str = 0
        let rev = length-1
        for(let n=0; n<length; n++) {
            let number = parseInt(bin[n])*Math.pow(2, rev)
            str += number
            rev--
        }
        resultsArray.push(str)
    })
    result.text(resultsArray.join(" "))
}



function populateArray(array, quot) {
    for(quot; quot > 0; quot/2) {
        if(quot%2 === 0) {
            array.push(0)
        }
        else {
            array.push(1)
        }
        quot = Math.trunc(quot/2)
    }
}

