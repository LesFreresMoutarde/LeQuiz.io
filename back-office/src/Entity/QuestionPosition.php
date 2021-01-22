<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * QuestionPosition
 *
 * @ORM\Table(name="question_position", indexes={@ORM\Index(name="question_position_position", columns={"position"})})
 * @ORM\Entity
 */
class QuestionPosition
{
    /**
     * @var string
     *
     * @ORM\Column(name="questionId", type="guid", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="SEQUENCE")
     * @ORM\SequenceGenerator(sequenceName="question_position_questionId_seq", allocationSize=1, initialValue=1)
     */
    private $questionid;

    /**
     * @var int
     *
     * @ORM\Column(name="position", type="integer", nullable=false)
     */
    private $position;

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
     * @var \Question
     *
     * @ORM\ManyToOne(targetEntity="Question")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name=""questionId"", referencedColumnName="id")
     * })
     */
    private $"questionid";


}
