$(function() {

    const items = $('nav a')
    items.on('click', function(e) {
        e.preventDefault();
    })


    // TAKING CARE OF THE MENU
    const howTo = $('.howTo')
    const about = $('.aboutProj')

    howTo.on('click', function(e) {
        e.stopPropagation()

        const block = $('.about')
        const navLi = $('.aboutProj')
        const item = $('.how-to')

        block.animate({'top': '-200vh'}, 200)
        block.removeClass('active')
        navLi.removeClass('active')

        if(howTo.hasClass('active')) {
            item.animate({'top': '-200vh'}, 200)
            item.removeClass('active')
            howTo.removeClass('active')
        }
        else {
            item.animate({'top': '60px'}, 200)
            item.addClass('active')
            howTo.addClass('active')
        }
    })
    about.on('click', function(e) {
        e.stopPropagation()

        const block = $('.how-to')
        const navLi = $('.howTo')
        const item = $('.about')

        block.animate({'top': '-200vh'}, 200)
        block.removeClass('active')
        navLi.removeClass('active')

        if(item.hasClass('active')) {
            item.animate({'top': '-200vh'}, 200)
            item.removeClass('active')
            about.removeClass('active')
        }
        else {
            item.animate({'top': '60px'}, 200)
            item.addClass('active')
            about.addClass('active')
        }
    })
    // menu active on click outside areas
    $('body').on('click', function(e) {
        const block = $('.block')
        const isHover = $('.block:hover').length
        const menu = $('nav ul li')
        if(menu.hasClass('active') && isHover === 0) {
            menu.removeClass('active')
            block.animate({'top': '-200vh'}, 200)
            block.removeClass('active')
        } 
    })


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


    // SWAP HOW TO
    const slideSwap = $('.how-to h2 span')
    slideSwap.on('click', function(e) {
        const text = $('#textToBinary')
        const numbers = $('#numbersToBinary')
        if(text.hasClass('active')) {
            text.removeClass('active')
            numbers.addClass('active')
            slideSwap.text('> How to convert text')
        }
        else {
            numbers.removeClass('active')
            text.addClass('active')
            slideSwap.text('> How to convert numbers')
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
    
    

    // CLOSE EASTER EGG
    $('.easter-egg').on('click', function() {
        $(this).fadeOut(200)
        $('.bin-clock').text('')
    })
});




function translateToBinary() {
    const bits = [128, 64, 32, 16, 8, 4, 2, 1]; 
    const input = $('#keys')

    let easter = input.val()
    let chars = input.val().split("")
    const charCodes = []
    const binaryArray = []

    if(easter == 'time') {
        // BINARY CLOCK
        clock();
        const binClock = setInterval(function() {
            clock();
        }, 1000)
        $('.easter-egg').fadeIn(200).css('display', 'flex')
    }

    $.each(chars, function(i, letter) {
        charCodes.push(letter.charCodeAt())
    })

    //console.log(charCodes)
    
    
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
    
    //console.log(chars)

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

    //console.log(charCodes)

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


function clock() {
    const clock = $('.bin-clock')

    const dt = new Date();
    const hrs = dt.getHours();
    const min = dt.getMinutes();
    const secs = dt.getSeconds();

    const hrsBin = []
    const minBin = []
    const secBin = []

    let hrsQuot = hrs
    let minQuot = min
    let secQuot = secs

    if(hrs == 0) {
        hrsBin.push(0)
    }
    if(min == 0) {
        minBin.push(0)
    }
    if(secs == 0) {
        secBin.push(0)
    }

    populateArray(hrsBin, hrsQuot)
    populateArray(minBin, minQuot)
    populateArray(secBin, secQuot)

    clock.text(hrsBin.reverse().join('')+' : '+minBin.reverse().join('')+' : '+secBin.reverse().join(''))
}
