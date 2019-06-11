
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
    image.inside("-w /mdn -v ${WORKSPACE}:/mdn -e HOME=${WORKSPACE}"){
      sh 'rm -rf node_modules'
      sh 'npm install'
    }
  }

  if (env.BRANCH_NAME == "master") {
    stage('Lint') {
      image.inside("-w /mdn -v ${WORKSPACE}:/mdn -e HOME=${WORKSPACE}") {
        sh 'npm run lint'
      }
    }
  }
  else if ((env.BRANCH_NAME == 'prod-push') || (env.BRANCH_NAME == 'stage-push')){
    stage('Build') {
      image.inside("-w /mdn -v ${WORKSPACE}:/mdn -e HOME=${WORKSPACE}") {
        sh 'npm run build'
      }
    }
    stage('Push') {
      if (env.BRANCH_NAME == 'prod-push') {
        println("Pushing to Prod bucket")
        syncS3('insights-prod-178589013767')
      }
      if (env.BRANCH_NAME == 'stage-push') {
        println("Pushing to Stage bucket")
        syncS3('insights-stage-178589013767')
      }
    }
  }
  else {
  }

  stage('Cleanup') {
    cleanWs(
      cleanWhenFailure: false
    )
  }
}

