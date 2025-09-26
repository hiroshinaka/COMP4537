const getGreetingHTML = (name, currentTime) => {
    return `
        <div style="color: blue;">
            <p><span style="font-weight: bold;">Hello, ${name},</span>
            <br>
            <span>What a beautiful day. Server current date and time is </span>
            <br>
            <span style="font-weight: bold;">Current server time:</span> ${currentTime}</p>
        </div>
    `;
};

module.exports = { getGreetingHTML };
