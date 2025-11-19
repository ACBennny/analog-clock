/*********************************************************************
 * Building the Analog clock
 * 
 * @author (Anyanwu Benedict Chuwkwuemeka)
 * @version 0.01
*********************************************************************/



/************************************************************************
 * This function takes a "width" and an "angle" to generate a Coordinate 
 * (x-axis, y-axis) for a position along the arc of the clock.
 * 
 * @param {number} size The size of the square bordering the clock (a.k.a. the diameter of the clock)
 * @param {number} angle The angle projecting from the top-left corner of the square bordering the clock
 * @returns {object} {pos_x, pos_y}
 ***********************************************************************/
function getCoordinates(size, angle)
{
    try
    {
        const s_half = (size / 2);
        const agl_rad = (angle / 180);
        const x_coord = (s_half * (1 + (Math.sin(agl_rad))));
        const y_coord = (s_half * (1 - (Math.cos(agl_rad))));

        return {pos_x: x_coord, pos_y: y_coord};
    }
    catch(get_coord_time_err)
    {
        console.error("Failed to get coordinates.\nDetails: ", get_coord_time_err);
        return null;
    }
}


/*********************************************************************
 * Uses the Date object to get the Hour (24-Hr format), Minute and seconds of the current time
 * 
 * @returns {object} {hour, minute, seconds}
 * 
 *********************************************************************/
function getCurrentTime()
{
    try
     {
        const date = new Date();
        const hrs = date.getHours();
        const mins = date.getMinutes();
        const secs = date.getSeconds();

        return {hour: hrs, minute: mins, seconds: secs};
    }
    catch(get_curr_time_err)
    {
        console.error("Failed to get current time.\nDetails: ", get_curr_time_err);
        return null;
    }
}



/************************************************************************
 * Updates the Hour's, minute's, and seconds' clock hands to match
 * the current time every second
 *
 * 
 ***********************************************************************/
function updateClockTime()
{
    try
    {
        const curr_time = getCurrentTime();
        const hourHand = document.querySelector("#hour-hand");
        const minsHand = document.querySelector("#minute-hand");
        const secsHand = document.querySelector("#seconds-hand");

        // Return if any of the ahnds are unavailble or time object is unavailable.
        if(
            (curr_time == null) || (hourHand == null) 
            || (minsHand == null) || (secsHand == null)
        ) 
        {
            throw new Error("Clock hand(s) could not be found or Current time object is unavailable");
        }

        // Get Rotation values
        const currHrPos = (curr_time.hour > 12) 
            ? (Math.abs(((12 - curr_time.hour) / 12) * 12) * 30)
            : (curr_time.hour * 30);
        const hourRotation = currHrPos + (((60 - (60 - curr_time.minute)) / 60) * 30);
        const minsRotation = (6 * curr_time.minute);
        const secsRotation = (6 * curr_time.seconds);
        
        // Update Clock Hands
        hourHand.style.transform = `rotate(${hourRotation}deg)`;
        minsHand.style.transform = `rotate(${minsRotation}deg)`;
        secsHand.style.transform = `rotate(${secsRotation}deg)`;

    }
    catch(clkc_upd_err)
    {
        console.error("Clock time update failed\nDetails: ", clkc_upd_err);
    }
}



/************************************************************************
 * Builds the analog clock
 * 
 ***********************************************************************/
function buildClockFace()
{
    document.body.insertAdjacentHTML(
        `afterbegin`,
        `
            <div class="scope">
                <div class="clock-base">
                    <div class="clock-bdr" clock-style="default">
                        <div class="hour-hand-bdr" id="hour-hand">
                            <div class="hour-hand-box"></div>
                        </div>
                        <div class="minute-hand-bdr" id="minute-hand">
                            <div class="minute-hand-box"></div>
                        </div>
                        <div class="seconds-hand-bdr" id="seconds-hand">
                            <div class="seconds-hand-box"></div>
                        </div>
                    </div>
                </div>
            </div>
        `
    )
    setInterval(updateClockTime, 1000);
}




window.onload = () =>
{
    //   
    buildClockFace();
}
