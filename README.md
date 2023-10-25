socketio = SocketIO(app, cors_allowed_origins="*")

@socketio.on("message")
def handle_message(message):
    # message = urllib.parse.unquote(message)
    print("Msg : ", message)
    send(message, broadcast=True)

@socketio.on("notif")
def handle_notif(message):
    emergencia = Emergencia(
        None,
        None,
        message["descripcion"],
        message["estado"],
        message["ambulancia_id"],
        message["hospital_id"],
    )
    if EmergenciaModel.add_emergencia(emergencia) == 1:
        print("se agrego emergencia")
        emergencias = EmergenciaModel.get_emergencias()
        emit("notif","ok", broadcast=True)
    else:
        print("no se agrego")
        emit("notif","sas", broadcast=True)

@socketio.on("connect", namespace="/chat")
def test_connect():
    emit("my response", {"data": "Connected"})

@socketio.on("disconnect", namespace="/chat")
def test_disconnect():
    print("Client disconnected")

@app.route("/logout")
@login_required
def logout():
    logout_user()
    #   flash("Usuario Salio", "success")
    return redirect("/login")