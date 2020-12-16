
def notify_slack(Map args, credential_id='slack-hook') {
    def command = "${env.WORKSPACE}/bin/slack-notify.sh"
    withCredentials([string(credentialsId: credential_id, variable: 'HOOK')]) {
        for (arg in args) {
            command += " --${arg.key} '${arg.value}'"
        }
        command += " --hook '${HOOK}'"
        sh command
    }
}

def syncS3(String bucket, String extra_args='') {
  try {
    sh "bin/s3-sync.sh ${bucket} ${extra_args}"
  } catch(err) {
      notify_slack([
        status: "failure",
        stage: "Failed to deploy to ${env.BRANCH_NAME}"
      ])
      throw err
  }
  notify_slack([
    status: "success",
    stage: "Shipped to ${env.BRANCH_NAME}"
  ])
}

node {
  stage('Prepare') {
    checkout scm
  }

  if (env.BRANCH_NAME == 'prod-push') {
    stage('Push') {
      println("Pushing to prod bucket")
      syncs3("insights-prod-178589013767")
    }
  }

  stage('Cleanup') {
    cleanWs(
      cleanWhenFailure: false
    )
  }
}

