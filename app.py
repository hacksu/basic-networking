from flask import Flask, render_template, send_from_directory

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/notes')
@app.route('/notes.html')
def notes():
    return render_template('notes.html')


@app.route('/labs/packet-tracer.md')
def companion_lab():
    return send_from_directory('labs', 'packet-tracer.md')


@app.route('/labs/packet-tracer/<filename>')
def packet_tracer_download(filename: str):
    return send_from_directory('labs/packet-tracer', filename, as_attachment=True)


if __name__ == '__main__':
    print("Starting Basic Networking at http://127.0.0.1:5174")
    app.run(debug=True, host='127.0.0.1', port=5174)
