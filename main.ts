radio.onReceivedNumber(function (receivedNumber) {
    if (Sender2 == 0) {
        let RecievedNumber = 0
        if (RecievedNumber != Local_Status_Code2) {
            if (RecievedNumber == 0) {
                Local_Status_Code2 = 0
            } else {
                Local_Status_Code2 = RecievedNumber
            }
            Xmit_Latest2(RecievedNumber)
            UpdateScreen(1)
        }
    }
})
function Xmit_Latest2 (num: number) {
	
}
input.onButtonPressed(Button.A, function () {
    if (Sender2 == 1) {
        Status_Code2 += 1
        UpdateScreen(Status_Code2)
        Xmit_Latest2(Status_Code2)
    }
})
input.onButtonPressed(Button.AB, function () {
    for (let index = 0; index < 4; index++) {
        Knight_Rider_LED()
    }
})
input.onButtonPressed(Button.B, function () {
    if (Sender2 == 1) {
        basic.showNumber(Status_Code2)
    } else {
        basic.showNumber(Local_Status_Code2)
    }
})
function Knight_Rider_LED () {
	
}
function UpdateScreen (val: number) {
    basic.clearScreen()
    if (val % 2 == 0) {
        basic.showLeds(`
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            `)
    } else {
        led.plot(2, 2)
    }
}
let new_status2 = 0
let Local_Status_Code2 = 0
let Status_Code2 = 0
let Sender2 = 0
radio.setGroup(12)
let Send_cycles2 = 5
if (Math.abs(input.magneticForce(Dimension.Strength)) > 350) {
    Sender2 = 1
    Xmit_Latest2(Status_Code2)
    for (let index = 0; index < 4; index++) {
        Knight_Rider_LED()
    }
} else {
    basic.showLeds(`
        . . . . .
        . # . # .
        . . . . .
        # . . . #
        . # # # .
        `)
    basic.pause(100)
    basic.clearScreen()
}
basic.forever(function () {
    if (Sender2 == 1) {
        new_status2 = pins.digitalReadPin(DigitalPin.P0)
    }
    if (new_status2 == 1 && Status_Code2 % 2 == 0) {
        Status_Code2 += 1
        UpdateScreen(1)
        Xmit_Latest2(Status_Code2)
    }
    if (new_status2 == 0 && Status_Code2 % 2 != 0) {
        Status_Code2 += 1
        UpdateScreen(1)
        Xmit_Latest2(Status_Code2)
    }
})
