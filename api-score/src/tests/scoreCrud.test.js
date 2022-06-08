export const scoreTest = (app, request) => {
    it('Should insert score win', async () => {
        await request(app)
            .post('/score?name=Cemb&score=300')
            .then(response => {
                const res = JSON.parse(response.text)
                console.log(res)
                expect(res.status).toBe('success')
                expect(res.data.userName).toBe('Cemb')
            });
    });
    it('Should get score', async () => {
        await request(app)
            .get('/score?name=Cemb')
            .then(response => {
                const res = JSON.parse(response.text)
                console.log(res)
                expect(res.status).toBe('success')
                expect(res.data.userName).toBe('Cemb')
                expect(res.data.score).toBe(300)
            });
    });
}

