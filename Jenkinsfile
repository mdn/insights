
def syncS3(String bucket, String extra_args='') {
    try {
        sh "bin/s3-sync.sh ${bucket} ${extra_args}"
    } catch(err) {
        sh "bin/irc-notify.sh --stage 's3 sync " + env.BRANCH_NAME + "' --status 'failed'"
        throw err
    }
    sh "bin/irc-notify.sh --stage 's3 sync " + env.BRANCH_NAME + "' --status 'shipped'"
}

node {
    def image = docker.image('node:current-alpine')

    stage('Prepare') {
        checkout scm

        println "Pulling image ${image.id}"
        image.pull()
    }

    stage ('Build') {
        image.inside("-w /mdn -v ${WORKSPACE}:/mdn") {
            sh 'rm -rf node_modules'
            sh 'npm install && npm run build'
        }
    }

    stage('Push') {
        if (env.BRANCH_NAME == 'prod-push') {
            println("Pushing to Prod bucket")
        }
        if (env.BRANCH_NAME == 'stage-push') {
            println("Pushing to Stage bucket")
        }
        throw new Exception (
            'Unable to determine the target name from the branch name'
        )
    }

    stage('Cleanup') {
        cleanWs(
            cleanWhenFailure: false
        )
    }
}
