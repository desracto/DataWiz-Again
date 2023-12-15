from . import main_bp

@main_bp.route("/are-you-running/", methods=['POST'])
def check_server_status():
    return 'Server Active', 200