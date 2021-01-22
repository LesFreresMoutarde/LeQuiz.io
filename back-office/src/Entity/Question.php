<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Question
 *
 * @ORM\Table(name="question", indexes={@ORM\Index(name="question_type", columns={"type"}), @ORM\Index(name="question_difficulty", columns={"difficulty"}), @ORM\Index(name="question_custom_quiz_id", columns={"customQuizId"}), @ORM\Index(name="question_status", columns={"status"})})
 * @ORM\Entity
 */
class Question
{
    /**
     * @var string
     *
     * @ORM\Column(name="id", type="guid", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="SEQUENCE")
     * @ORM\SequenceGenerator(sequenceName="question_id_seq", allocationSize=1, initialValue=1)
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="type", type="string", length=40, nullable=false)
     */
    private $type;

    /**
     * @var string|null
     *
     * @ORM\Column(name="difficulty", type="string", length=30, nullable=true)
     */
    private $difficulty;

    /**
     * @var string
     *
     * @ORM\Column(name="content", type="text", nullable=false)
     */
    private $content;

    /**
     * @var json
     *
     * @ORM\Column(name="answer", type="json", nullable=false)
     */
    private $answer;

    /**
     * @var string
     *
     * @ORM\Column(name="status", type="string", length=30, nullable=false)
     */
    private $status;

    /**
     * @var json|null
     *
     * @ORM\Column(name="media", type="json", nullable=true)
     */
    private $media;

    /**
     * @var string|null
     *
     * @ORM\Column(name="customQuizId", type="guid", nullable=true)
     */
    private $customquizid;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="createdAt", type="datetimetz", nullable=false)
     */
    private $createdat;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="updatedAt", type="datetimetz", nullable=false)
     */
    private $updatedat;

    /**
     * @var \CustomQuiz
     *
     * @ORM\ManyToOne(targetEntity="CustomQuiz")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name=""customQuizId"", referencedColumnName="id")
     * })
     */
    private $"customquizid";


}
