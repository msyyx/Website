from locust import HttpLocust, TaskSet

def login(l):
    l.client.post("user/find", {"username":"silvia", "password":"neverKnows"})

def index(l):
    l.client.get("/")

def profile(l):
    l.client.get("profile.html")
	
def search(l):
    l.client.get("host/search/me")

def search2(l):
    l.client.get("host/search/la")	

def search3(l):
    l.client.get("host/search/food")	
	
def host(l):
    l.client.get("host/570476f619d84eb477ecaba0")
	
	
class UserBehavior(TaskSet):
    tasks = {index:2, profile:1, search:1, search2:1, host:1 , search3:1}

    def on_start(self):
        index(self)

class WebsiteUser(HttpLocust):
    task_set = UserBehavior
    min_wait=5000
    max_wait=9000
