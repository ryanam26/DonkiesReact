import os

from fabric.api import *
from fabric.colors import green, red, yellow
from fabric.contrib.console import confirm
from fabric.decorators import with_settings


env.output_prefix = False

env.hosts = ['root@138.197.5.61']
env.password = 'MBSkd207T'

PROJECT_PATH = os.path.join('/', 'home', 'ryan', 'react', 'React')


@with_settings(warn_only=True)
def pull():
    print(yellow('Start getting files from github'))

    with cd(PROJECT_PATH):
        if confirm('Stash?', default=False):
            run('git stash --all')
            run('git pull --rebase')
            run('git stash pop')
        else:
            run('git pull --no-commit')

        print(green('Getting files from github completed'))


@with_settings(warn_only=True)
def restart_nginx():
    print(green('Restarting nginx...'))
    run('service nginx restart')


@with_settings(warn_only=True)
def build():
    local('yarn build')


@with_settings(warn_only=True)
def push():
    local('./node_modules/.bin/git-commander')
    local('git commit')
    local('git push')


@with_settings(warn_only=True)
def deploy():

    print(green('Deploying to server'))

    execute(build)
    execute(push)

    execute(pull)

    if confirm('Restart nginx?', default=False):
        execute(restart_nginx)
