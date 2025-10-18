class App {
    constructor() {
        this.API_BASE = window.API_BASE;
        this.msgs = window.msgs;
        this.container = document.querySelector('.main');
        this.title = document.createElement('h1');
        this.title.textContent = this.msgs.title;
        this.container.appendChild(this.title);
        this.createSeedButton();
        this.createQueryInput();
        this.createQueryButton();
        this.createDisplayArea();
    }
    createSeedButton() {
    this.seedBtn = document.createElement('button');
    this.seedBtn.textContent = this.msgs.seed_btn_msg;
    this.seedBtn.style.marginRight = '0.5rem';
    this.container.appendChild(this.seedBtn);

    this.seedBtn.addEventListener('click', () => this.insertSampleRows());
    }
    createQueryInput(){
        const label = document.createElement('label');
        label.textContent = 'SQL:';
        label.style.display = 'block';
        label.style.marginTop = '1rem';
        this.queryInput = document.createElement('textarea');
        this.queryInput.rows = 5;
        this.queryInput.style.width = '100%';
        this.queryInput.setAttribute('placeholder', this.msgs.query_input_placeholder);

        this.container.appendChild(label);
        this.container.appendChild(this.queryInput);
    }
    createQueryButton() {
        this.queryButton = document.createElement('button');
        this.queryButton.textContent = this.msgs.btn_msg;
        this.container.appendChild(this.queryButton);
        this.queryButton.addEventListener('click', async () => this.runQuery(this.queryInput.value));
    }

    createDisplayArea() {
        this.displayArea = document.createElement('div');
        this.displayArea.id = 'display-area';
        this.container.appendChild(this.displayArea);
    }

    renderResult(result){
        this.displayArea.innerHTML ='';
        const rows = Array.isArray(result?.rows) ? result.rows : (Array.isArray(result) ? result : null);

    if (rows && rows.length && typeof rows[0] === 'object' && rows[0] !== null) {
        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        const cols = Object.keys(rows[0]);
        cols.forEach(col => {
            const th = document.createElement('th');
            th.textContent = col;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        const tbody = document.createElement('tbody');
        rows.forEach(r => {
            const tr = document.createElement('tr');
            cols.forEach(c => {
            const td = document.createElement('td');
            td.textContent = (r[c] ?? '').toString();
            tr.appendChild(td);
            });
            tbody.appendChild(tr);
        });
        table.appendChild(tbody);

        this.displayArea.appendChild(table);
        } else {
        this.displayArea.textContent = JSON.stringify(result, null, 2);
        }
    }
       
    async insertSampleRows() {
    const insertSQL = `
      INSERT INTO patient (first_name, last_name, gender, birth_date, phone, email)
      VALUES
        ('Alice','Nguyen','F','1995-07-21','604-555-0101','alice@example.com'),
        ('Bob','Singh','M','1990-01-05','604-555-0102','bob@example.com'),
        ('Carol','Tan','F','1988-11-14','604-555-0103','carol@example.com');
    `;
    try{
        const res = await fetch(`${this.API_BASE}/sql`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ query: insertSQL })
        });
        const data = await res.json();
        this.renderResult(data);
    }catch(err){
        this.displayArea.textContent = "Error inserting sample data: " + err.message;
    }
}
    async runQuery(query) {
    const q = (query || '').trim();
    const lower = q.toLowerCase();
    this.displayArea.textContent = this.msgs.running_msg;

    if (/(update|delete|drop|alter|truncate)\b/.test(lower)) {
        alert('UPDATE/DELETE/DROP/ALTER/TRUNCATE are blocked.');
        return;
    }
    if (!/^(select|insert)\b/.test(lower)) {
        alert('Only SELECT and INSERT are allowed in this lab.');
        return;
    }

    try {
        this.displayArea.textContent = this.msgs.running_msg;
        if (lower.startsWith('insert')) {
        const res = await fetch(`${this.API_BASE}/sql`, {
            method: 'POST',
            mode: 'cors',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query: q })
        });
        const data = await res.json();
        this.renderResult(data);
        } else {
        const url = `${this.API_BASE}/sql?q=${encodeURIComponent(q)}`;
        const res = await fetch(url, {
            method: 'GET',
            mode: 'cors',
            headers: { 'accept': 'application/json' },
        });
        const data = await res.json();
        this.renderResult(res.ok ? data : { error: data?.error || 'Select failed', detail: data });
        }
    } catch (err) {
        this.displayArea.textContent = "Error running query: " + err.message;
    }
    }

 
            
}

new App();