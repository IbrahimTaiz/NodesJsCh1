// استيراد وحدات Node.js الأساسية
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

// دالة لتقديم ملف index.html
function serveHtml(res) {
    const filePath = path.join(__dirname, 'index.html');
    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.error('File read error:', err);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Server Error: Could not read HTML file');
            return;
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
    });
}

// دالة لتقديم استجابة API بصيغة JSON
function serveApiPing(res) {
    const responseData = {
        message: 'pong',
        timestamp: new Date().toISOString(),
        status: 'ok'
    };
    // تحديد Content-Type كـ application/json
    res.writeHead(200, { 'Content-Type': 'application/json' }); 
    res.end(JSON.stringify(responseData));
}

// دالة لمعالجة خطأ 404 (المسار غير موجود)
function serveNotFound(res) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found: The requested resource does not exist.');
}

// إنشاء خادم HTTP باستخدام منطق التوجيه (Routing)
const server = http.createServer((req, res) => {
    switch (req.url) { // استخدام switch لتنظيم التوجيه
        case '/':
        case '/index.html':
            serveHtml(res);
            break;
        case '/api/ping': // معالجة مسار API الجديد
            serveApiPing(res);
            break;
        default:
            serveNotFound(res); // معالجة أي مسار آخر
            break;
    }
});

// بدء الخادم
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
    console.log('Test the API at http://localhost:${PORT}/api/ping');
    console.log('Press Ctrl+C to stop the server.');
});
