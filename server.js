// استيراد وحدات Node.js الأساسية: http و fs و path
const http = require('http');
const fs = require('fs');
const path = require('path');

// تعريف المنفذ
const PORT = 3000;

// إنشاء خادم HTTP
const server = http.createServer((req, res) => {
    // التحقق من المسار المطلوب (الرئيسي)
    if (req.url === '/' || req.url === '/index.html') {
        
        // بناء المسار الصحيح لملف index.html
        const filePath = path.join(__dirname, 'index.html');

        // قراءة الملف بشكل غير متزامن
        fs.readFile(filePath, (err, data) => {
            if (err) {
                // التعامل مع الأخطاء
                console.error('File read error:', err);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Server Error: Could not read file');
                return;
            }

            // إرسال الاستجابة بنجاح
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    } else {
        // استجابة أولية للمسارات غير المعروفة
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found (Basic)');
    }
});

// بدء الخادم والاستماع على المنفذ المحدد
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
    console.log('اضغط Ctrl+C لإيقاف الخادم.');
});