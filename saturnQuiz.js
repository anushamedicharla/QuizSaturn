(function(){

	var app = angular.module('satQuiz',[]); //application variable declared : satQuiz

	app.controller('SQuizControl',['$scope','$http','$sce',function($scope,$http,$sce){
		$scope.score = 0;
		$scope.activeQuestion = -1;
		$scope.activeQuestionAnswered = 0;
		$scope.percentage = 0;

		$http.get('quiz_data.json').then(function(quizData){
			$scope.myQuestions = quizData.data;
			$scope.totalQuestions = $scope.myQuestions.length;

		$scope.clickAnswer = function(queIndex, ansIndex){
			var questionState = $scope.myQuestions[queIndex].questionState; // to test if the question is answered
			if (questionState != 'answered') {
				$scope.myQuestions[queIndex].selectedAnswer = ansIndex;
				var correctAnswer = $scope.myQuestions[queIndex].correct;
				$scope.myQuestions[queIndex].correctAnswer = correctAnswer;
				if (correctAnswer === ansIndex) {
					$scope.myQuestions[queIndex].correctness = 'correct';
					$scope.score += 1;
				}else{
					$scope.myQuestions[queIndex].correctness = 'incorrect';
				}
				$scope.myQuestions[queIndex].questionState = 'answered';
			}

			$scope.percentage = (( $scope.score / $scope.totalQuestions ) * 100).toFixed(2);
		}

		$scope.isSelected = function(queIndex, ansIndex){
			return $scope.myQuestions[queIndex].selectedAnswer === ansIndex;
		}

		$scope.isCorrect = function(queIndex, ansIndex){
			return $scope.myQuestions[queIndex].correctAnswer === ansIndex;
		}

		});

		$scope.clickContinue = function(){
			return $scope.activeQuestion += 1;
		}

		$scope.createLinks = function(percentage){

			var emailLink = '<a class="butn email" href="mailto:?subject=Hey! Try to beat my score!&amp;body=I scored a '+ percentage +
			'% on this Saturn Quiz. Try to beat it!">Email a friend</a>';
			var tweetLink = '<a class= "butn twitter" target="_blank" href="http://twitter.com/share?text=I scored a' + percentage +
			'% on this Saturn Quiz. Try to beat it!">Tweet your score</a>';

			var newMarkup = emailLink + tweetLink;

			return $sce.trustAsHtml(newMarkup);

		}

	}])
})();