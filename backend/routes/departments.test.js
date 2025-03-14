const request = require('supertest');
const express = require('express');
const router = require('./departments'); // Adjust the path accordingly

// Create an Express app and use JSON parsing
const app = express();
app.use(express.json());
app.use('/departments', router);

describe('DELETE /departments/:id', () => {
    it('should delete the department and return success message', async () => {
        // Replace "2" with a valid department id in your test DB.
        const res = await request(app).delete('/departments/4');
        expect(res.statusCode).toEqual(200);
        expect(res.text).toEqual("Department deleted successfully.");
    });

    it('should return 500 when there is an error deleting the department', async () => {
        // For example, passing an invalid id might trigger an error.
        const res = await request(app).delete('/departments/invalid');
        expect(res.statusCode).toEqual(500);
        expect(res.text).toEqual("Error deleting department.");
    });
});
